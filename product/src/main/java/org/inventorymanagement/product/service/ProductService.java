package org.inventorymanagement.product.service;

import java.util.*;

import org.inventorymanagement.product.exceptionhandler.ProductIdMismatchException;
import org.inventorymanagement.product.exceptionhandler.ProductNotFoundException;
import org.inventorymanagement.product.model.FilterOptions;
import org.inventorymanagement.product.model.Form;
import org.inventorymanagement.product.model.Option;
import org.inventorymanagement.product.model.Product;
import org.inventorymanagement.product.repository.FormRepository;
import org.inventorymanagement.product.repository.MongoConnection;
import org.inventorymanagement.product.utils.ProductUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository
public class ProductService {

	/*
	 * 
	 * TODO Verify fields before saving TODO Error Occurs when saving twice on the
	 * same form
	 * 
	 */

	@Autowired
	private FormRepository formRepository;

	@Autowired
	private MongoOperations mongoOps;

	@Autowired
	MongoConnection repository;

	public Product insertProduct(String productMap) throws JsonMappingException, JsonProcessingException {
		final ObjectMapper mapper = new ObjectMapper();
		final Product product = mapper.readValue(productMap, Product.class);
		String candidate = ProductUtils.toSlug(product.getProductId()) + "-";
		do {
			candidate = candidate + String.valueOf((new Random()).nextInt(10));
		} while (repository.existsByUrl(candidate));

		product.setUrl(candidate);
		return repository.save(product);
	}

	public Map<String, Object> getProducts(String formUrl, Integer pageNumber, Integer recordsPerPage, String sortBy,
			String descending, String searchText, List<FilterOptions> filters, Boolean isProduct) {

		Pageable pageableRequest = PageRequest.of(pageNumber, recordsPerPage, Sort.by(sortBy));
		if (descending.equals("true"))
			pageableRequest = PageRequest.of(pageNumber, recordsPerPage, Sort.by(sortBy).descending());

        Query query = new Query();
        Criteria expression = new Criteria();
        String formId;
          formId = formRepository.findByUrlAndOption(formUrl, !isProduct).get_id();

        List<Criteria> criterias = new ArrayList<>();
        criterias.add(Criteria.where("formId").is(formId));

      for(FilterOptions filter: filters) {
        Map<String, Object> options = filter.getOptions();
        String id = filter.getId();
        List<Object> selected = filter.getSelected();
        String datatype = options.get("dataType").toString();
        if(datatype.equalsIgnoreCase("number")) {
          criterias.add(Criteria.where(id).gte(selected.get(0)).lte(selected.get(1)));
        } else if(datatype.equalsIgnoreCase("checkbox")) {
          if(selected.size() == 0) continue;
          criterias.add(Criteria.where(id).in(selected));
        } else if(datatype.equalsIgnoreCase("date")) {
          criterias.add(Criteria.where(id).gte(selected.get(0)).lte(selected.get(1)));
        }

		}

      query.addCriteria(expression.andOperator(criterias.toArray(new Criteria[criterias.size()])));
      if(!searchText.equals(""))
        query.addCriteria(TextCriteria.forDefaultLanguage().matching("^.*"+ searchText+".*$"));
      Map<String, Object> resp =  new HashMap<>();
      if(isProduct) {
        resp.put("totalProducts", mongoOps.count(query, Product.class));
        query.with(pageableRequest);
        List<Product> products = mongoOps.find(query, Product.class);
        resp.put("response",products);
      } else {
        resp.put("totalProducts", mongoOps.count(query, Option.class));
        query.with(pageableRequest);
        List<Option> products = mongoOps.find(query, Option.class);
        resp.put("response",products);
      }
      return resp;
    }

	public Product getProductById(String id) {

		return repository.findByProductId(id);
	}

	public Product updateProductById(String id, Product product) {

		if (!product.getProductId().equals(id)) {
			throw new ProductIdMismatchException("Product id  does not match with the request body");
		}
		Product oldProduct = getProductById(id);
		if (oldProduct == null)
			return repository.save(product);

		product.set_id(oldProduct.get_id());
		return repository.save(product);
	}

	public Product getProductByUrl(String formUrl, String productUrl) {
		Form form = formRepository.findByUrlAndOption(formUrl, false);
		if (form == null)
			throw new ProductNotFoundException("Form Url incorrect");
		String formId = form.get_id();
		Product product = repository.findByUrlAndFormId(productUrl, formId);
		if (product == null)
			throw new ProductNotFoundException("Option Url incorrect");
		return product;
	}

	public Map<String, List> getMaxMinValue(String formUrl, List<String> sortFields) {

        Map<String, List> mp = new HashMap<>();
        sortFields.stream().forEach(sortField -> {
            log.info(sortField);
            Query maxQuery = new Query();
            Criteria expression = new Criteria();
            String formId = formRepository.findByUrlAndOption(formUrl, false).get_id();
            expression.andOperator(Criteria.where("formId").is(formId));
            maxQuery.addCriteria(expression).with(Sort.by(Sort.Direction.DESC, sortField)).limit(1).fields().include(sortField).exclude("_id");
            Product maxProduct = mongoOps.findOne(maxQuery,  Product.class);
            log.info("{}", maxProduct);

            Query minQuery = new Query();
            minQuery.addCriteria(expression).with(Sort.by(Sort.Direction.ASC, sortField)).limit(1).fields().include(sortField).exclude("_id");
            Product minProduct = mongoOps.findOne(minQuery, Product.class);
            log.info("{}", minProduct);
            try {
              String minValue = new ObjectMapper().convertValue(minProduct, Map.class).get(sortField).toString();
              String maxValue = new ObjectMapper().convertValue(maxProduct, Map.class).get(sortField).toString();
              mp.put(sortField, new ArrayList<>(Arrays.asList(minValue, maxValue)));
            } catch (Exception e) {
              mp.put(sortField, new ArrayList<>(Arrays.asList(null, null)));
            }
        });


        return mp;

	}
}
