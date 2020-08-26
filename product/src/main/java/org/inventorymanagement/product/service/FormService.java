package org.inventorymanagement.product.service;

import java.util.List;

import javax.validation.Valid;

import org.apache.commons.text.CaseUtils;
import org.inventorymanagement.product.model.Form;
import org.inventorymanagement.product.repository.FormRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FormService {
	
	@Autowired
	private FormRepository repository;

	public Form saveForm(@Valid Form form) {
		String id = CaseUtils.toCamelCase(form.getLabelText(), false);
		form.setId(id);
		return repository.save(form);
	}

	public List<Form> findAllForms() {
		return repository.findAll();
	}
	
}
