package org.inventorymanagement.product.service;

import org.inventorymanagement.product.exceptionhandler.ProductNotFoundException;
import org.inventorymanagement.product.model.Form;
import org.inventorymanagement.product.model.Option;
import org.inventorymanagement.product.repository.FormRepository;
import org.inventorymanagement.product.repository.OptionRepository;
import org.inventorymanagement.product.utils.ProductUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class OptionService {
	
	/*
	 * 
	 * TODO Verify fields before saving
	 * TODO Error Occurs when saving twice on the same form
	 * 
	 */

    @Autowired
    OptionRepository repository;
    
    @Autowired 
    FormRepository formRepository;
    
    public Option insertOption(Option option) {
    	option.setOptionUrl(ProductUtils.toSlug(option.getOptionName()));
    	return repository.save(option);
    }


    public Option getOptionByUrl(String formUrl, String optionUrl) {
    	Form form = formRepository.findByUrlAndOption(formUrl, true);
    	if(form == null) 
    		throw new ProductNotFoundException("Form Url incorrect");
    	String formId = form.get_id();
    	
    	Option option =repository.findByOptionUrlAndFormId(optionUrl, formId);
    	if(option == null)
    		throw new ProductNotFoundException("Option Url incorrect");
        return option;
    }
    
    public Option getOptionById(String id) {
    	Option option = repository.findById(id).orElse(null);
    	if(option == null) {
    		throw new ProductNotFoundException("Option with this id not found");
    	}
    	return option;
    }

}
