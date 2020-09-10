package org.inventorymanagement.product.service;

import java.util.*;

import org.inventorymanagement.product.exceptionhandler.ProductIdMismatchException;
import org.inventorymanagement.product.exceptionhandler.ProductNotFoundException;
import org.inventorymanagement.product.model.*;
import org.inventorymanagement.product.repository.FormRepository;
import org.inventorymanagement.product.repository.ProductRepository;
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
  ProductRepository repository;

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
		Form form = formRepository.findByUrlAndModel(formUrl, Model.PRODUCT);
		if (form == null)
			throw new ProductNotFoundException("Form Url incorrect");
		String formId = form.get_id();
		Product product = repository.findByUrlAndFormId(productUrl, formId);
		if (product == null)
			throw new ProductNotFoundException("Url incorrect");
		return product;
	}
}
