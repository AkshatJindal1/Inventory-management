package org.inventorymanagement.product.controller;

import java.util.HashMap;
import java.util.List;

import org.inventorymanagement.product.model.Sale;
import org.inventorymanagement.product.service.SalesService;
import org.inventorymanagement.product.service.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

@RestController()
@CrossOrigin
@RequestMapping("/sales")
public class SaleController {

	@Autowired
	SalesService service;

	@Autowired
	UserManagementService userService;

	@PostMapping
	public void addSale(@RequestBody HashMap<String, Object> data, @RequestHeader("Authorization") String token) throws JsonMappingException, JsonProcessingException {
		String client = userService.getClientName(token);
		service.insertSales(data, client);
	}
	
	@GetMapping
	public List<Sale> getAllSales(@RequestHeader("Authorization") String token) throws JsonMappingException, JsonProcessingException {
		String client = userService.getClientName(token);
		return service.getSales(client);
	}
}
