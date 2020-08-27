package org.inventorymanagement.product.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.inventorymanagement.product.exceptionhandler.ProductNotFoundException;
import org.inventorymanagement.product.model.Field;
import org.inventorymanagement.product.model.Form;
import org.inventorymanagement.product.repository.FormRepository;
import org.inventorymanagement.product.utils.ProductUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FormService {

	/*
	 * 
	 * TODO Customised Exception Handling.
	 * 
	 * TODO While saving compare if default values changed autogenerate new field id
	 * for new field if collides with other, use random number generator, replace
	 * text with number for id, like the mongo one
	 * 
	 */

	@Autowired
	private FormRepository repository;

	public List<Field> getDefaultForms() {
		return ProductUtils.getDefaultForms();
	}

	public Form saveForm(List<Field> fields, String formName, String formId) {

		// Check if Form Id and Form Name are not null or blank

		if (formName == null || formName.trim().equals("")) {
			throw new ProductNotFoundException("Form Name Cannot be null");
		}

		Set<String> mandatoryIds = ProductUtils.getMandatoryIds();
		Set<String> requestIds = fields.stream()
				.map(field -> ProductUtils.generateId(field.getLabelText(), field.getId())).collect(Collectors.toSet());

		// Check if Duplicate Keys are sent

		if (requestIds.size() != fields.size()) {
			System.out.println("Duplicate Keys >>>>>>>>>>>>");
			System.out.println(fields.size() + " " + requestIds.size());
			System.out.println(mandatoryIds.toString());
			System.out.println(requestIds.toString());
			System.out.println("<<<<<<<<<<<<<<<<");
			throw new ProductNotFoundException("Duplicate Key Error");
		}

		// Check if All Mandatory Fields are present

		if (!requestIds.containsAll(mandatoryIds)) {
			// TODO Error Condition: All Mandatory IDs not found
			System.out.println("Mandatory Missing >>>>>>>>>>>>");
			System.out.println(mandatoryIds.toString());
			System.out.println(requestIds.toString());
			System.out.println("<<<<<<<<<<<<<<<<");
			throw new ProductNotFoundException("Mandatory Field Missing");
		}

		// Generate Ids for new fields

		for (Field f : fields) {
			String id = ProductUtils.generateId(f.getLabelText(), f.getId());
			f.setId(id);
		}

		// Update the Form Object

		Form form;
		if (formId == null) {

			// If new Form let mongo generate a new Id and create a new form

			form = new Form(formName, fields);
		} else {

			// If updating a Form delete the previous form and create a identical new form

			repository.deleteById(formId);
			form = new Form(formId, formName, fields);
		}

		return repository.save(form);
	}

	public Form getForm(String formId) {
		return repository.findById(formId).orElse(null);
	}

	public List<Form> getAllForms() {
		return repository.findAll();
	}

	public Form deleteForm(String formId) {
		Form deletedForm = repository.findById(formId).orElse(null);
		repository.deleteById(formId);
		return deletedForm;
	}

}
