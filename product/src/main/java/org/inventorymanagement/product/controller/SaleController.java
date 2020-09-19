package org.inventorymanagement.product.controller;

import java.util.HashMap;

import org.inventorymanagement.product.service.SalesService;
import org.inventorymanagement.product.service.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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

}
