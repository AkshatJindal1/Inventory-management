package org.inventorymanagement.product.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.inventorymanagement.product.exceptionhandler.ProductNotFoundException;
import org.inventorymanagement.product.model.Datatype;
import org.inventorymanagement.product.model.Field;
import org.inventorymanagement.product.model.Form;
import org.inventorymanagement.product.repository.FormRepository;
import org.inventorymanagement.product.utils.ProductUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
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
	 * TODO can use Hash generator for generating ids
	 * 
	 * TODO Error Condition: All Mandatory IDs not found, throw proper error
	 * 
	 * TODO Unique Slugs for all fields
	 * 
	 */

	@Autowired
	private FormRepository repository;

	public List<Field> getDefaultForms(String category) {

		Boolean option = ProductUtils.getOptions(category);

		return ProductUtils.getDefaultForms(option);
	}

	public Form saveForm(List<Field> fields, String name, String id, String category) {

		Boolean option = ProductUtils.getOptions(category);

		// Check if Form Name is null or blank

		if (name == null || name.trim().equals("")) {
			throw new ProductNotFoundException("Form Name Cannot be null");
		}

		Set<String> mandatoryIds = ProductUtils.getMandatoryIds(option);
		Set<String> requestIds = fields.stream()
				.map(field -> ProductUtils.generateId(field.getLabelText(), field.getId())).collect(Collectors.toSet());

		// Check if Duplicate Keys are sent

		if (requestIds.size() != fields.size()) {
			throw new ProductNotFoundException("Duplicate Key Error\nMandatory Ids: " + mandatoryIds.toString()
					+ "\nRequestedIds: " + requestIds.toString());
		}

		// Check if All Mandatory Fields are present

		if (!requestIds.containsAll(mandatoryIds)) {
			throw new ProductNotFoundException("Mandatory Field Missing\nMandatory Ids: " + mandatoryIds.toString()
					+ "\nRequestedIds: " + requestIds.toString());
		}

		// Generate Ids for new fields

		for (Field f : fields) {
			String generatedId = ProductUtils.generateId(f.getLabelText(), f.getId());
			f.setId(generatedId);
		}

		// Update the Form Object

		Form form = null;

		if (id == null || id.trim().equals("")) {

			// If new Form let mongo generate a new Id and create a new form

			form = new Form(ProductUtils.toSlug(name), option, name, fields);
		}

		else {

			// If updating a Form delete the previous form and create a identical new form

			Form deletedForm = deleteForm(id);
			if (deletedForm == null) {
				throw new ProductNotFoundException("Product with that id could not be found");
			}

			form = new Form(id, ProductUtils.toSlug(name), option, name, fields);
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

	public Form getByUrl(String url, String category) {

		Boolean option = ProductUtils.getOptions(category);

		Form form = repository.findByUrlAndOption(url, option);
//		List<Field> allFields = form.getFields();
//		for(Field field: allFields) {
//			if(field.getDatatype())
//		}

		if (form == null)
			throw new ProductNotFoundException("URL NOT FOUND");
		return form;
	}

	public Pair<List<Datatype>, List<Datatype>> getAllDatatypes() {
		List<Datatype> datatypeFromDb = repository.getDatatypes();
		List<Datatype> defaultTypes = ProductUtils.getDefaultDatatype();
		Pair<List<Datatype>, List<Datatype>> pair = Pair.of(datatypeFromDb, defaultTypes);
		return pair;
	}

}
