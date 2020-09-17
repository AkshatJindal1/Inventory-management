package org.inventorymanagement.product.service;

import java.util.List;

import lombok.extern.slf4j.Slf4j;
import org.inventorymanagement.product.exceptionhandler.ProductNotFoundException;
import org.inventorymanagement.product.exceptionhandler.UnauthenticatedUserException;
import org.inventorymanagement.product.model.DefaultTemplates;
import org.inventorymanagement.product.model.Form;
import org.inventorymanagement.product.repository.FormRepository;
import org.inventorymanagement.product.repository.UserManagementRepository;
import org.inventorymanagement.product.security.model.CustomUser;
import org.inventorymanagement.product.utils.DefaultTemplatesUtil;
import org.inventorymanagement.product.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

@Slf4j
@Service
public class UserManagementService {

	@Autowired
	private UserManagementRepository userRepository;

	@Autowired
	private FormRepository formRepository;

	public String getClientName(String token) throws JsonProcessingException {
		String subject = SecurityUtils.getSubjectFromToken(token.split(" ")[1]);
		CustomUser user = userRepository.findBySubject(subject);
		if (user == null)
			throw new ProductNotFoundException("User Not Found");
		return user.getClientName();
	}

	public void updateUser(String token, DefaultTemplates defaultTemplate, String clientName)
			throws JsonMappingException, JsonProcessingException {
		log.info(token, defaultTemplate, clientName);
		String subject = SecurityUtils.getSubjectFromToken(token.split(" ")[1]);
		CustomUser user = userRepository.getUserBySubject(subject);
		if(user == null) 
			throw new ProductNotFoundException("User Not Found");
			
		user.setClientName(clientName);
		user.setDefaultTemplates(defaultTemplate);
		user.setTemplateSelected(true);
		
		// Get All Forms
		List<Form> forms = DefaultTemplatesUtil.getDefaultTextileForms(clientName, defaultTemplate);
		
		userRepository.save(user);
		formRepository.saveAll(forms);
	}

	public CustomUser getUserDetails(String token) throws JsonProcessingException {
		String subject = SecurityUtils.getSubjectFromToken(token.split(" ")[1]);
		CustomUser user = userRepository.getUserBySubject(subject);
		if(user == null) {
			user = new CustomUser();
			user.setSubject(SecurityUtils.getSubjectFromToken(token.split(" ")[1]));
			user.setTemplateSelected(false);
			userRepository.save(user);
		}
		return user;
	}

	public Boolean checkIfClientExists(String token, String clientName) throws JsonProcessingException {

		String subject = SecurityUtils.getSubjectFromToken(token.split(" ")[1]);
		CustomUser user = userRepository.getUserBySubject(subject);
		if(user == null)
			throw new UnauthenticatedUserException("User is not authenticated");
		return userRepository.existsByClientName(clientName);
	}

}
