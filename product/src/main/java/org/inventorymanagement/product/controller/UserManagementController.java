package org.inventorymanagement.product.controller;

import org.inventorymanagement.product.model.DefaultTemplates;
import org.inventorymanagement.product.security.model.CustomUser;
import org.inventorymanagement.product.service.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
	private UserManagementService userService;

	@PostMapping
	public void updateUser(@RequestParam String clientName, @RequestParam("industry") DefaultTemplates defaultTemplate,
			@RequestHeader("Authorization") String token) throws JsonMappingException, JsonProcessingException {
		userService.updateUser(token, defaultTemplate, clientName);
	}
	
	@GetMapping("industry")
	public DefaultTemplates[] getTemplates() {
		return DefaultTemplates.values();
	}
	
	@GetMapping
	public CustomUser getUser(@RequestHeader("Authorization") String token) throws JsonProcessingException {
		return userService.getUserDetails(token);

	}

}
