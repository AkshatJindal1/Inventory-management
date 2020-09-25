package org.inventorymanagement.product.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;

import org.inventorymanagement.product.exceptionhandler.Exceptions.RequiredFieldsMissingException;
import org.inventorymanagement.product.exceptionhandler.Exceptions.FormNameNullException;
import org.inventorymanagement.product.exceptionhandler.Exceptions.FormNotFoundException;
import org.inventorymanagement.product.exceptionhandler.Exceptions.ProductNotFoundException;
import org.inventorymanagement.product.model.Datatype;
import org.inventorymanagement.product.model.Field;
import org.inventorymanagement.product.model.Form;
import org.inventorymanagement.product.model.FormShort;
import org.inventorymanagement.product.model.Model;
import org.inventorymanagement.product.repository.FormRepository;
import org.inventorymanagement.product.repository.OptionRepository;
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

	@Autowired
	private OptionRepository optionRepository;

	public List<Field> getDefaultForms(String category) {

		Model model = ProductUtils.getModel(category);

		return ProductUtils.getDefaultForms(model);
	}

	public Form saveForm(List<Field> fields, String name, String id, String category, String client) {

		Model model = ProductUtils.getModel(category);

		// Check if Form Name is null or blank
		if (name == null || name.trim().equals("")) {
			throw new FormNameNullException();
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
		Set<String> requestIds = fields.stream().map(field -> field.getId()).collect(Collectors.toSet());

		// Check if Duplicate Keys are sent
		if (requestIds.size() != fields.size()) {
			throw new RequiredFieldsMissingException("Duplicate Keys", requestIds, mandatoryIds);
		}

		// Check if All Mandatory Fields are present
		if (!requestIds.containsAll(mandatoryIds)) {
			throw new RequiredFieldsMissingException("Mandatory Missing", requestIds, mandatoryIds);
		}

		// Set a url for the form
		String slugCandidate = ProductUtils.toSlug(name) + "-";
		do {
			slugCandidate = slugCandidate + (new Random()).nextInt(10);
		} while (repository.existsByUrlAndClient(slugCandidate, client));

		// Update the Form Object
		if (id == null || id.trim().equals("")) {

			// If new Form let mongo generate a new Id and create a new form
			form = new Form();
			form.setUrl(slugCandidate);
			form.setModel(model);
			form.setName(name);
			form.setFields(fields);
			form.setClient(client);
			form.setNameClient(ProductUtils.getNameClient(name, client));
		}

		else {

//			TODO I think we can just replace it

			// If updating a Form delete the previous form and create a identical new form
			if (form == null) {
				throw new FormNotFoundException();
			}
			form.setUrl(slugCandidate);
			form.setName(name);
			form.setFields(fields);
			form.setNameClient(ProductUtils.getNameClient(name, client));
		}

		System.out.println(form);
		return repository.save(form);
	}

	public void deleteForm(List<String> formIds, String client) {
		repository.deleteBy_idInAndClient(formIds, client);
	}

	public Form getByUrl(String url, String category, String client) {

		Model model = ProductUtils.getModel(category);

		Form form = repository.findByUrlAndModelAndClient(url, model, client);

		if (form == null)
			throw new FormNotFoundException();

		for (Field f : form.getFields()) {
			f.setMenuitems(optionRepository.findByFormId(f.getDatatype()));
		}

		return form;
	}

	public Pair<List<Datatype>, List<Datatype>> getAllDatatypes(String client) {
		List<Datatype> datatypeFromDb = repository.getDatatypes(client);
		System.out.println(datatypeFromDb);
		List<Datatype> defaultTypes = ProductUtils.getDefaultDatatype();
		Pair<List<Datatype>, List<Datatype>> pair = Pair.of(datatypeFromDb, defaultTypes);
		return pair;
	}

	public HashMap<Model, List<FormShort>> getAllFormShorts(String client) {
		HashMap<Model, List<FormShort>> map = new HashMap<Model, List<FormShort>>();
		for (Model m : Model.values()) {
			map.put(m, new ArrayList<FormShort>());
		}
		List<FormShort> allFormShort = repository.getFormShorts(client);
		for (FormShort form : allFormShort) {
			map.get(form.getModel()).add(form);
		}
		return map;
	}
}
