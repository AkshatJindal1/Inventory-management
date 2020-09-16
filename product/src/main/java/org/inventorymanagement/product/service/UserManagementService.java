package org.inventorymanagement.product.service;

import java.util.List;

import org.inventorymanagement.product.exceptionhandler.ProductNotFoundException;
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

	public void saveUser(String token, DefaultTemplates defaultTemplate, String clientName)
			throws JsonMappingException, JsonProcessingException {
		
		// Create new Customer
		CustomUser user = new CustomUser();
		user.setClientName(clientName);
		user.setSubject(SecurityUtils.getSubjectFromToken(token.split(" ")[1]));
		user.setDefaultTemplates(defaultTemplate);
		
		// Get All Forms
		List<Form> forms = DefaultTemplatesUtil.getDefaultTextileForms(clientName, defaultTemplate);
		
		userRepository.save(user);
		formRepository.saveAll(forms);
	}

}
