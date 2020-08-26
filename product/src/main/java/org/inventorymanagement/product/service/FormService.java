package org.inventorymanagement.product.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.apache.commons.text.CaseUtils;
import org.inventorymanagement.product.model.Form;
import org.inventorymanagement.product.repository.FormRepository;
import org.inventorymanagement.product.utils.ProductUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FormService {
	
	@Autowired
	private FormRepository repository;

	public Form addField(@Valid Form form) {
		String id = CaseUtils.toCamelCase(form.getLabelText(), false);
		form.setId(id);
		return repository.save(form);
	}

	public List<Form> findAllForms() {
		return repository.findAll();
	}

	public List<Form> saveForm(@Valid List<Form> form) {
		
		System.out.println("+++");
		for(Form f: form) {
			System.out.println(f.getId() + " " + f.getLabelText());
		}
		System.out.println("+++");
		
		Set<String> mandatoryIds = ProductUtils.getMandatoryIds();
		Set<String> requestIds = form.stream().map(field -> ProductUtils.generateId(field.getLabelText(), field.getId())).collect(Collectors.toSet());
		
		if(requestIds.size() != form.size()) {
			// TODO Error Condition: Duplicate Keys present, Or too Similar Names
			// TODO Handle the case seperatly or assign new ids dynamically

			System.out.println(form.size() + " " + requestIds.size());
			System.out.println(mandatoryIds.toString());
			System.out.println(requestIds.toString());
			System.out.println("Duplicate Keys");
			return null;
		}
		
		if(!requestIds.containsAll(mandatoryIds)) {
			// TODO Error Condition: All Mandatory IDs not found
			System.out.println("Mandatory Missing");
			System.out.println(mandatoryIds.toString());
			System.out.println(requestIds.toString());
			return null;
		}
		
		repository.deleteAll();
		
		for(Form f: form) {
			String id = ProductUtils.generateId(f.getLabelText(), f.getId());
			f.setId(id);
		}
		
		System.out.println("+++");
		for(Form f: form) {
			System.out.println(f.getId() + " " + f.getLabelText());
		}
		System.out.println("+++");
		
		return repository.saveAll(form);
		
	}

	public List<Form> getDefaultForms() {
		return ProductUtils.getDefaultForms();
	}
}
