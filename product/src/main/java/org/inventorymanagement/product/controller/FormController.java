package org.inventorymanagement.product.controller;

import java.util.List;

import javax.validation.Valid;

import org.inventorymanagement.product.model.Form;
import org.inventorymanagement.product.service.FormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@CrossOrigin
@RequestMapping("/forms")
public class FormController {

	@Autowired
	private FormService service;
	
	@PostMapping(path = "/field", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public Form addField(@Valid @RequestBody Form field) {
        return service.addField(field);
    }
	
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Form> addForm(@Valid @RequestBody List<Form> form) {
        return service.saveForm(form);
    }
	
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Form> getAllForms() {
        return service.findAllForms();
    }	
	
	@GetMapping(value = "default",  produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Form> getDefaultForm() {
        return service.getDefaultForms();
    }	
	
	
}