package org.inventorymanagement.product.controller;

import org.inventorymanagement.product.service.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

@RestController()
@CrossOrigin
@RequestMapping("/user-management")
public class UserManagementController {
	
	@Autowired
	private UserManagementService service;
	
	@PostMapping
	public void saveUser(@RequestParam String clientName,
			@RequestHeader("Authorization") String token) throws JsonMappingException, JsonProcessingException {
		service.saveUser(token, clientName);
	}

}
