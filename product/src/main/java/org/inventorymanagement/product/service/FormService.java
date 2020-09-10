package org.inventorymanagement.product.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;

import lombok.extern.slf4j.Slf4j;
import org.inventorymanagement.product.exceptionhandler.ProductNotFoundException;
import org.inventorymanagement.product.model.*;
import org.inventorymanagement.product.repository.FormRepository;
import org.inventorymanagement.product.repository.OptionRepository;
import org.inventorymanagement.product.utils.ProductUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

@Slf4j
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

	@Autowired
	private OptionRepository optionRepository;

	public List<Field> getDefaultForms(String category) {

		Model model = ProductUtils.getOptions(category);

		return ProductUtils.getDefaultForms(model);
	}

	public Form saveForm(List<Field> fields, String name, String id, String category) {
		Model model = ProductUtils.getOptions(category);
		// Check if Form Name is null or blank

		if (name == null || name.trim().equals("")) {
			throw new ProductNotFoundException("Form Name Cannot be null");
		}

		// Generate Ids for new fields
		Form form = repository.findById(id).orElse(null);
		ArrayList<String> ids = new ArrayList<>();
		if (form != null) {
			for (Field f : form.getFields()) {
				ids.add(f.getId());
			}
		}
		for (Field f : fields) {
			String generatedId = ProductUtils.getOrGenerateId(f.getLabelText(), f.getId(), ids);
			f.setId(generatedId);
		}

		Set<String> mandatoryIds = ProductUtils.getMandatoryIds(model);
		Set<String> requestIds = fields.stream()
				.map(field -> field.getId())
				.collect(Collectors.toSet());
		
		System.out.println(requestIds);
		System.out.println(ids);

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
		
		// Set a url for the form
		
		String slugCandidate = ProductUtils.toSlug(name) + "-";
		do {
			slugCandidate = slugCandidate + String.valueOf((new Random()).nextInt(10));
		} while (repository.existsByUrl(slugCandidate));

		// Update the Form Object

		if (id == null || id.trim().equals("")) {

			// If new Form let mongo generate a new Id and create a new form

			form = new Form(slugCandidate, model, name, fields);
		}

		else {

			// If updating a Form delete the previous form and create a identical new form
			if (form == null) {
				throw new ProductNotFoundException("Product with that id could not be found");
			}
			repository.deleteById(id);
			form = new Form(id, slugCandidate, model, name, fields);
		}

		return repository.save(form);
	}

	public Form getForm(String formId) {
		return repository.findById(formId).orElse(null);
	}

	public List<Form> getAllForms() {
		return repository.findAll();
	}

	public void deleteForm(List<String> formIds) {
		repository.deleteBy_idIn(formIds);
	}

	public Form getByUrl(String url, String category) {

		Model model = ProductUtils.getOptions(category);

		Form form = repository.findByUrlAndModel(url, model);

		if (form == null)
			throw new ProductNotFoundException("URL NOT FOUND");

		for (Field f : form.getFields()) {
			f.setMenuitems(optionRepository.findByFormId(f.getDatatype()));
		}

		return form;
	}

	public Pair<List<Datatype>, List<Datatype>> getAllDatatypes() {
		List<Datatype> datatypeFromDb = repository.getDatatypes();
		List<Datatype> defaultTypes = ProductUtils.getDefaultDatatype();
		Pair<List<Datatype>, List<Datatype>> pair = Pair.of(datatypeFromDb, defaultTypes);
		return pair;
	}

	public Pair<List<FormShort>, List<FormShort>> getAllFormShorts() {
		List<FormShort> allFormShort = repository.getFormShorts();
		Map<Boolean, List<FormShort>> partitionedFormShorts = allFormShort.stream()
				.collect(Collectors.partitioningBy(x -> x.getOption().equals(Model.OPTION)));
		Pair<List<FormShort>, List<FormShort>> pair = Pair.of(partitionedFormShorts.get(false),
				partitionedFormShorts.get(true));
		return pair;
	}

}
