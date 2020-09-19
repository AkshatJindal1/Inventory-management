package org.inventorymanagement.product.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.inventorymanagement.product.exceptionhandler.ProductNotFoundException;
import org.inventorymanagement.product.model.Form;
import org.inventorymanagement.product.model.Model;
import org.inventorymanagement.product.model.Product;
import org.inventorymanagement.product.repository.FormRepository;
import org.inventorymanagement.product.repository.ProductRepository;
import org.inventorymanagement.product.utils.ProductUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
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
	 * TODO Verify fields before saving
	 * 
	 * TODO Error Occurs when saving twice on the same form
	 * 
	 */

	@Autowired
	private FormRepository formRepository;

	@Autowired
	private ProductRepository productRepository;

	public Product insertProduct(String productMap, String client)
			throws JsonMappingException, JsonProcessingException {
		final ObjectMapper mapper = new ObjectMapper();
		final Product product = mapper.readValue(productMap, Product.class);

		// If New Product
		if (product.get_id() == null || product.get_id().trim().equals("")) {

			// Check if formId and clientName Match
			if (!formRepository.existsBy_idAndClient(product.getFormId(), client)) {
				throw new ProductNotFoundException("Not Enough Permissions");
			}

			// Check if productId and formId match
			if (productRepository.existsByProductIdAndFormId(product.getProductId(), product.getFormId())) {
				throw new ProductNotFoundException("Product with same id already exists");
			}
		}

		// Update Product
		else {

			// Check if formId and clientName match
			if (!formRepository.existsBy_idAndClient(product.getFormId(), client)) {
				throw new ProductNotFoundException("Not Enough Permissions");
			}

			// Check if _id and formId match
			Product oldProduct = productRepository.findBy_idAndFormId(product.get_id(), product.getFormId());
			if (oldProduct == null) {
				throw new ProductNotFoundException("Product Not Found");
			}

			// Check if productId and formId match
			if (!oldProduct.getProductId().equals(product.getProductId())
					&& productRepository.existsByProductIdAndFormId(product.getProductId(), product.getFormId())) {
				throw new ProductNotFoundException("Product with same name already exists");
			}
		}

		String candidate = ProductUtils.toSlug(product.getProductId()) + "-";
		do {
			candidate = candidate + String.valueOf((new Random()).nextInt(10));
		} while (productRepository.existsByUrl(candidate));

		product.setUrl(candidate);
		product.setClientName(client);
		return productRepository.save(product);
	}

	public Product getProductByUrl(String formUrl, String productUrl, String client) {
		Form form = formRepository.findByUrlAndModelAndClient(formUrl, Model.PRODUCT, client);
		if (form == null)
			throw new ProductNotFoundException("Form Url incorrect");
		String formId = form.get_id();
		Product product = productRepository.findByUrlAndFormId(productUrl, formId);
		if (product == null)
			throw new ProductNotFoundException("Url incorrect");
		return product;
	}
	public void deleteProducts(List<String> uids, String formUrl, String client) {

		String formId = formRepository.findByUrlAndModelAndClient(formUrl, Model.PRODUCT, client).get_id();
		for(String uid: uids) {
			productRepository.deleteBy_idAndFormId(uid, formId);
		}
	}

  public List<Product> getProductBySearchText(String searchText, String client) {

		return productRepository.getBySearchTextAndClient(client, searchText);
  }
}
