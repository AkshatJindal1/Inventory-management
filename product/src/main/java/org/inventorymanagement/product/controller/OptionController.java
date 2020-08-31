package org.inventorymanagement.product.controller;

import javax.validation.Valid;

import org.inventorymanagement.product.model.Option;
import org.inventorymanagement.product.service.OptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@CrossOrigin
@RequestMapping("/options")
public class OptionController {

    @Autowired
    OptionService service;
    

    @PostMapping
    public Option addOption(@Valid @RequestBody Option option) {
        return service.insertOption(option);
    }

//    @GetMapping("/{optionId}")
//    public Option getOptionById(@PathVariable("optionId") String optionId) {
//        return service.getOptionById(optionId);
//    }
//    
    @GetMapping("/{formUrl}/{optionUrl}")
    public Option getOptionByOptionName(@PathVariable("formUrl") String formUrl, @PathVariable("optionUrl") String optionUrl) {
        return service.getOptionByUrl(formUrl, optionUrl);
    }

}
