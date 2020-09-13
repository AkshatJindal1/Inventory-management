package org.inventorymanagement.product.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import lombok.extern.slf4j.Slf4j;
import org.inventorymanagement.product.model.*;
import org.inventorymanagement.product.service.CommonService;
import org.inventorymanagement.product.service.ProductService;
import org.inventorymanagement.product.service.SalesService;
import org.inventorymanagement.product.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController()
@CrossOrigin
@RequestMapping("/sales")
public class SaleController {

	@Autowired
	SalesService service;

	@Autowired
	CommonService commonService;

	@Value(value = "${auth0.issuer}")
	private String issuer;

	@PostMapping
	public Sale addSale(@Valid @RequestBody Sale sale) throws JsonMappingException, JsonProcessingException {
		return service.insertSales(sale);
	}

	@GetMapping("/{formUrl}/{saleUrl}")
	public Sale getSaleById(@PathVariable("formUrl") String formUrl, @PathVariable("saleUrl") String saleUrl, @RequestHeader("Authorization") String token) throws JsonMappingException, JsonProcessingException {

		String client = SecurityUtils.getClientName(token, issuer);
		
		return service.getSaleByUrl(formUrl, saleUrl, client);
	}

	@PostMapping("/{formUrl}")
	public Map<String, Object> getSales(@RequestBody Filter req, @PathVariable("formUrl") String formUrl, @RequestHeader("Authorization") String token) throws JsonMappingException, JsonProcessingException {

		Integer pageNumber = req.getPageNumber() == null ? 0 : req.getPageNumber();
		Integer recordsPerPage = req.getRecordsPerPage() == null ? 5 : req.getRecordsPerPage();
		String sortBy = req.getSortBy() == null || req.getSortBy().equals("0") ? "productId" : req.getSortBy();
		String isDescending = req.getDescending() == null ? "false" : req.getDescending();
		String searchText = req.getSearchText() == null ? "" : req.getSearchText();
		List<FilterOptions> filters = req.getFilter() == null ? new ArrayList<>() : req.getFilter();

		String client = SecurityUtils.getClientName(token, issuer);
		
		return commonService.getProducts(formUrl, pageNumber, recordsPerPage, sortBy, isDescending, searchText, filters,
				Model.SALE, client);

	}

	@PutMapping("/{productId}")
	public Sale updateSale(@RequestBody Sale sale, @PathVariable("productId") String productId) {

		return service.updateSalesById(productId, sale);
	}

	@GetMapping("/{formUrl}/min-max/")
	public Map<String, List> getMaxMinValue(@PathVariable("formUrl") String formUrl,
			@RequestParam("sortFields") List<String> sortFields, @RequestHeader("Authorization") String token) throws JsonMappingException, JsonProcessingException {
		
		String client = SecurityUtils.getClientName(token, issuer);
		
		return commonService.getMaxMinValue(formUrl, sortFields, Model.SALE, client);
	}
}
