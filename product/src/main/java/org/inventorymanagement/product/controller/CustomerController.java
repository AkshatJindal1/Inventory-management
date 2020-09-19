package org.inventorymanagement.product.controller;

import java.util.HashMap;
import java.util.List;

import javax.validation.Valid;

import org.inventorymanagement.product.model.Customer;
import org.inventorymanagement.product.model.Datatype;
import org.inventorymanagement.product.model.Field;
import org.inventorymanagement.product.model.Form;
import org.inventorymanagement.product.model.FormShort;
import org.inventorymanagement.product.model.Model;
import org.inventorymanagement.product.service.CustomerService;
import org.inventorymanagement.product.service.FormService;
import org.inventorymanagement.product.service.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.util.Pair;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	public void getAllDatatypes(@RequestHeader("Authorization") String token, @RequestBody Customer customer)
			throws JsonMappingException, JsonProcessingException {
		String client = userService.getClientName(token);
		service.save(client, customer);
	}

}