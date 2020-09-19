package org.inventorymanagement.product.controller;

import java.util.List;

import org.inventorymanagement.product.model.Customer;
import org.inventorymanagement.product.service.CustomerService;
import org.inventorymanagement.product.service.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

@RestController()
@CrossOrigin
@RequestMapping("customer/")
public class CustomerController {

	/*
	 * TODO addForm: if formId or formName not sent, throw a valid exception
	 */

	@Autowired
	private CustomerService service;

	@Autowired
	private UserManagementService userService;

	@PostMapping
	public void saveCustomer(@RequestHeader("Authorization") String token, @RequestBody Customer customer)
			throws JsonMappingException, JsonProcessingException {
		String client = userService.getClientName(token);
		service.save(client, customer);
	}

	@GetMapping
	public List<Customer> getCustomers(@RequestParam("searchText") String searchText,
			@RequestHeader("Authorization") String token) throws JsonMappingException, JsonProcessingException {
		String client = userService.getClientName(token);
		return service.getCustomers(client, searchText);
	}

}