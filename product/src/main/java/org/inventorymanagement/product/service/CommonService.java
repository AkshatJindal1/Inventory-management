package org.inventorymanagement.product.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.inventorymanagement.product.exceptionhandler.ProductNotFoundException;
import org.inventorymanagement.product.model.*;
import org.inventorymanagement.product.repository.FormRepository;
import org.inventorymanagement.product.repository.OptionRepository;
import org.inventorymanagement.product.repository.ProductRepository;
import org.inventorymanagement.product.repository.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.stereotype.Service;

import java.util.*;
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
  private SaleRepository saleRepository;
  @Autowired
  private MongoOperations mongoOps;

  public Map<String, Object> getProducts(
      String formUrl,
      Integer pageNumber,
      Integer recordsPerPage,
      String sortBy,
      String descending,
      String searchText,
      List<FilterOptions> filters,
      Model modelType) {

    Pageable pageableRequest = PageRequest.of(pageNumber, recordsPerPage, Sort.by(sortBy));
    if (descending.equals("true"))
      pageableRequest = PageRequest.of(pageNumber, recordsPerPage, Sort.by(sortBy).descending());

    Query query = new Query();
    Criteria expression = new Criteria();
    List<Criteria> criterias = new ArrayList<>();

    String formId = formRepository.findByUrlAndModel(formUrl, modelType).get_id();
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
    if(!searchText.equals(""))
      query.addCriteria(TextCriteria.forDefaultLanguage().matching("^.*"+ searchText+".*$"));

    query.addCriteria(expression.andOperator(criterias.toArray(new Criteria[criterias.size()])));

    Map<String, Object> resp =  new HashMap<>();
    switch(modelType) {
      case OPTION:
        resp.put("totalProducts", mongoOps.count(query, Option.class));
        query.with(pageableRequest);
        List<Option> options = mongoOps.find(query, Option.class);
        resp.put("response",options);
        break;

      case PRODUCT:
        resp.put("totalProducts", mongoOps.count(query, Product.class));
        query.with(pageableRequest);
        List<Product> products = mongoOps.find(query, Product.class);
        resp.put("response",products);
        break;

      case SALE:
        resp.put("totalProducts", mongoOps.count(query, Sale.class));
        query.with(pageableRequest);
        List<Sale> sales = mongoOps.find(query, Sale.class);
        resp.put("response",sales);
        break;

      default:
        break;
    }
    return resp;
  }

  public Map<String, List> getMaxMinValue(String formUrl, List<String> sortFields, Model modelType) {

    Map<String, List> mp = new HashMap<>();
    Criteria expression = new Criteria();
    String formId;
    formId = formRepository.findByUrlAndModel(formUrl, modelType).get_id();
    expression.andOperator(Criteria.where("formId").is(formId));


    sortFields.stream().forEach(sortField -> {

      log.info(sortField);
      Query maxQuery = new Query();
      maxQuery.addCriteria(expression).with(Sort.by(Sort.Direction.DESC, sortField)).limit(1).fields().include(sortField).exclude("_id");
      Product maxProduct = mongoOps.findOne(maxQuery,  Product.class);

      Query minQuery = new Query();
      minQuery.addCriteria(expression).with(Sort.by(Sort.Direction.ASC, sortField)).limit(1).fields().include(sortField).exclude("_id");
      Product minProduct = mongoOps.findOne(minQuery, Product.class);

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
