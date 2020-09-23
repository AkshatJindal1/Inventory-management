package org.inventorymanagement.product.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.inventorymanagement.product.exceptionhandler.NoSupportedMethodException;
import org.inventorymanagement.product.model.*;
import org.inventorymanagement.product.repository.FormRepository;
import org.inventorymanagement.product.repository.OptionRepository;
import org.inventorymanagement.product.repository.ProductRepository;
import org.inventorymanagement.product.repository.SaleRepository;
import org.inventorymanagement.product.utils.ProductUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class CommonService {

	@Autowired
	private FormRepository formRepository;

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private OptionRepository optionRepository;

	@Autowired
	private MongoOperations mongoOps;

	public Map<String, Object> getProducts(String formUrl, Integer pageNumber, Integer recordsPerPage, String sortBy,
			String descending, String searchText, List<FilterOptions> filters, Model modelType, String client) {

		// GET ALL DEFAULT FIELD
		List<String> defaultFieldIds = ProductUtils
				.getDefaultForms(modelType)
				.stream()
				.map( field -> field.getId())
				.collect(Collectors.toList());

		// CREATE PAGINATION AND SORT QUERY
		sortBy = ProductUtils.fullyQualifiedFieldName(sortBy, defaultFieldIds);
		Pageable pageableRequest = PageRequest.of(pageNumber, recordsPerPage, Sort.by(sortBy));
		if (descending.equals("true"))
			pageableRequest = PageRequest.of(pageNumber, recordsPerPage, Sort.by(sortBy).descending());

		Query query = new Query();
		Criteria expression = new Criteria();
		List<Criteria> criterias = new ArrayList<>();

		String formId = "";
		formId = formRepository.findByUrlAndModelAndClient(formUrl, modelType, client).get_id();

		criterias.add(Criteria.where("formId").is(formId));

		// CREATE FILTER QUERIES
		for (FilterOptions filter : filters) {
			Map<String, Object> options = filter.getOptions();
			String id = ProductUtils.fullyQualifiedFieldName(filter.getId(), defaultFieldIds);
			List<Object> selected = filter.getSelected();
			String datatype = options.get("dataType").toString();
			if (datatype.equalsIgnoreCase("number") && selected.get(0) != null && selected.get(1) != null) {
				criterias.add(Criteria.where(id).gte(selected.get(0)).lte(selected.get(1)));
			} else if (datatype.equalsIgnoreCase("checkbox")) {
				if (selected.size() == 0)
					continue;
				criterias.add(Criteria.where(id).in(selected));
			} else if (datatype.equalsIgnoreCase("date")) {
				criterias.add(Criteria.where(id).gte(selected.get(0)).lte(selected.get(1)));
			}
		}

		// CREATE SEARCH TEXT QUERY
		if (!searchText.equals("")) {
			List<Criteria> searchQuery = new ArrayList<>();
			List<String> textFieldList = new ArrayList<>();
			switch (modelType) {
				case OPTION:
					textFieldList = Arrays.asList("optionName"); break;
				case PRODUCT:
					textFieldList = Arrays.asList("productId", "productName"); break;
				default:
					new ArrayList<>();
					break;
			}
			textFieldList.forEach( field -> searchQuery.add(Criteria.where(field).regex(searchText, "i")));
			criterias.add(new Criteria().orOperator(searchQuery.toArray(new Criteria[searchQuery.size()])));
		}

		// COMBINE ALL QUERY
		query.addCriteria(expression.andOperator(criterias.toArray(new Criteria[criterias.size()])));

		log.info("QUERY: {}", query);
		Map<String, Object> resp = new HashMap<>();
		switch (modelType) {
			case OPTION:
				resp.put("totalProducts", mongoOps.count(query, Option.class));
				query.with(pageableRequest);
				List<Option> options = mongoOps.find(query, Option.class);
				resp.put("response", options);
				break;

			case PRODUCT:
				resp.put("totalProducts", mongoOps.count(query, Product.class));
				query.with(pageableRequest);
				List<Product> products = mongoOps.find(query, Product.class);
				resp.put("response", products);
				break;

			case SALE:
				resp.put("totalProducts", mongoOps.count(query, Sale.class));
				query.with(pageableRequest);
				List<Sale> sales = mongoOps.find(query, Sale.class);
				resp.put("response", sales);
				break;

			default:
				break;
		}
		return resp;
	}

	public Map<String, List> getMaxMinValue(String formUrl, List<String> sortFields, Model modelType, String client) {

		Map<String, List> mp = new HashMap<>();
		Criteria expression = new Criteria();
		String formId;
		if(modelType == Model.SALE) {
			formId = formRepository.findByUrlAndModel(formUrl, modelType).get_id();
			expression.andOperator(Criteria.where("formId").is(formId), Criteria.where("client").is(client));
		} else {
			formId = formRepository.findByUrlAndModelAndClient(formUrl, modelType, client).get_id();
			expression.andOperator(Criteria.where("formId").is(formId));
		}

		// GET ALL DEFAULT FIELD
		List<String> defaultFieldIds = ProductUtils
				.getDefaultForms(modelType)
				.stream()
				.map( field -> field.getId())
				.collect(Collectors.toList());

		Class classType;
		switch (modelType) {
		case PRODUCT:
			classType = Product.class;
			break;
		case SALE:
			classType = Sale.class;
			break;
		case OPTION:
			classType = Option.class;
			break;
		default:
			throw new NoSupportedMethodException(
					"No supported method found: Currently supported product, sale and option");
		}

		sortFields.stream().forEach(sortField -> {
			String fullSortField = ProductUtils.fullyQualifiedFieldName(sortField, defaultFieldIds);
			Query maxQuery = new Query();
			maxQuery.addCriteria(expression).with(Sort.by(Sort.Direction.DESC, fullSortField)).limit(1);

			Query minQuery = new Query();
			minQuery.addCriteria(expression).with(Sort.by(Sort.Direction.ASC, fullSortField)).limit(1);

			try {
				String minValue = new ObjectMapper().convertValue(mongoOps.findOne(minQuery, classType), Map.class)
						.getOrDefault(sortField, 0).toString();
				String maxValue = new ObjectMapper().convertValue(mongoOps.findOne(maxQuery, classType), Map.class)
						.getOrDefault(sortField, 0).toString();
				mp.put(sortField, new ArrayList<>(Arrays.asList(minValue==null ? maxValue: minValue, maxValue == null ? minValue: maxValue)));
			} catch (Exception e) {
				mp.put(sortField, new ArrayList<>(Arrays.asList(null, null)));
			}
		});
		return mp;
	}
}
