package org.inventorymanagement.product.service;

import org.inventorymanagement.product.exceptionhandler.ProductNotFoundException;
import org.inventorymanagement.product.repository.UserManagementRepository;
import org.inventorymanagement.product.security.model.CustomUser;
import org.inventorymanagement.product.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

@Service
public class UserManagementService {
	
	@Autowired
	private UserManagementRepository repository;
	
	public String getClientName(String token) throws JsonProcessingException {
		String subject = SecurityUtils.getSubjectFromToken(token.split(" ")[1]);
		CustomUser user = repository.findBySubject(subject);
		if(user == null) throw new ProductNotFoundException("User Not Found");
		return user.getClientName();	
	}
	
	public void saveUser(String token, String clientName) throws JsonMappingException, JsonProcessingException {
		CustomUser user = new CustomUser();
		user.setClientName(clientName);
		user.setSubject(SecurityUtils.getSubjectFromToken(token.split(" ")[1]));
		repository.save(user);
	}

}
