package org.inventorymanagement.product.controller;

import java.util.List;

import javax.validation.Valid;

import org.inventorymanagement.product.model.Field;
import org.inventorymanagement.product.model.Form;
import org.inventorymanagement.product.service.FormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@CrossOrigin
@RequestMapping("/forms")
public class FormController {

	@Autowired
	private FormService service;
	
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public Form addForm(@Valid @RequestBody List<Field> fields, @RequestParam(required = false) String formId, @RequestParam String formName) {
        return service.saveForm(fields, formName, formId);
    }
	
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public Form getForms(@RequestParam String formId) {
		return service.getForm(formId);
	}
	
	@GetMapping(path="all", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Form> getAllForms() {
		return service.getAllForms();
	}
	
	@GetMapping(value="default") 
	public List<Field> getDefault() {
		return service.getDefaultForms();
	}
	
	@DeleteMapping
	public Form deleteForm(@RequestParam String formId) {
		return service.deleteForm(formId);
	}
		
}

// TODO addForm: if formId or formName not sent, throw a valid exception