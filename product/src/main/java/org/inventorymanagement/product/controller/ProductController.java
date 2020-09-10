package org.inventorymanagement.product.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.inventorymanagement.product.model.Filter;
import org.inventorymanagement.product.model.FilterOptions;
import org.inventorymanagement.product.model.Model;
import org.inventorymanagement.product.model.Product;
import org.inventorymanagement.product.service.CommonService;
import org.inventorymanagement.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController()
@CrossOrigin
@RequestMapping("/products")
public class ProductController {

	@Autowired
	ProductService service;

	@Autowired
	CommonService commonService;

	@PostMapping
	public Product addProduct(@Valid @RequestBody String product) throws JsonMappingException, JsonProcessingException {
		return service.insertProduct(product);
	}

	@GetMapping("/{formUrl}/{productUrl}")
	public Product getOptionByOptionName(@PathVariable("formUrl") String formUrl,
			@PathVariable("productUrl") String productUrl) {
		return service.getProductByUrl(formUrl, productUrl);
	}

	@PostMapping("/{formUrl}")
	public Map<String, Object> getProducts(@RequestBody Filter req, @PathVariable("formUrl") String formUrl) {

        Integer pageNumber = req.getPageNumber() == null ? 0 : req.getPageNumber();
        Integer recordsPerPage = req.getRecordsPerPage() == null ? 5 : req.getRecordsPerPage();
        String sortBy = req.getSortBy() == null || req.getSortBy().equals("0")  ? "productId" : req.getSortBy();
        String isDescending = req.getDescending() == null ? "false" : req.getDescending();
        String searchText = req.getSearchText() == null ? "" : req.getSearchText();
        List <FilterOptions> filters = req.getFilter() == null ? new ArrayList<>() : req.getFilter();

		return commonService.getProducts(formUrl, pageNumber, recordsPerPage, sortBy, isDescending, searchText, filters,
				Model.PRODUCT);

	}

	@PutMapping("/{productId}")
	public Product updateProduct(@RequestBody Product product, @PathVariable("productId") String productId) {

		return service.updateProductById(productId, product);
	}

	@GetMapping("/{formUrl}/min-max/")
	public Map<String, List> getMaxMinValue(@PathVariable("formUrl") String formUrl,
			@RequestParam("sortFields") List<String> sortFields) {
		return commonService.getMaxMinValue(formUrl, sortFields, Model.PRODUCT);
	}


}
