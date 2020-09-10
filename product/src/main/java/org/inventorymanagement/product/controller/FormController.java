package org.inventorymanagement.product.controller;

import java.util.HashMap;
import java.util.List;

import javax.validation.Valid;

import org.inventorymanagement.product.model.Datatype;
import org.inventorymanagement.product.model.Field;
import org.inventorymanagement.product.model.Form;
import org.inventorymanagement.product.model.FormShort;
import org.inventorymanagement.product.model.Model;
import org.inventorymanagement.product.service.FormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@CrossOrigin
@RequestMapping("forms/")
public class FormController {

	/*
	 * TODO addForm: if formId or formName not sent, throw a valid exception
	 */

	@Autowired
	private FormService service;
	
	@PostMapping(value="/delete")
	public void deleteForm(@RequestBody List<String> deletionList) {
		service.deleteForm(deletionList);
	}

	@PostMapping(value = "/{category}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public Form addForm(@Valid @RequestBody List<Field> fields, @RequestParam(required = false) String formId,
			@RequestParam String formName, @PathVariable("category") String category) {
		return service.saveForm(fields, formName, formId, category);
	}

	@GetMapping(path = "/all/raw")
	public List<Form> getAllFormsRaw() {
		return service.getAllForms();
	}
	
	@GetMapping(path = "/all")
	public HashMap<Model, List<FormShort>> getAllFormShorts() {
		return service.getAllFormShorts();
	}

	@GetMapping(value = "/{category}/default")
	public List<Field> getDefault(@PathVariable("category") String category) {
		return service.getDefaultForms(category);
	}

	@GetMapping(value = "/{category}/url")
	public Form getFormByUrl(@RequestParam String url, @PathVariable("category") String category) {
		return service.getByUrl(url, category);
	}
	
	@GetMapping(path = "datatypes")
	public Pair<List<Datatype>, List<Datatype>> getAllDatatypes() {
		return service.getAllDatatypes();
	}

}