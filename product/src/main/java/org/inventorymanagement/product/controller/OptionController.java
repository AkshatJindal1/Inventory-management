package org.inventorymanagement.product.controller;

import javax.validation.Valid;

import lombok.extern.slf4j.Slf4j;
import org.inventorymanagement.product.model.Filter;
import org.inventorymanagement.product.model.FilterOptions;
import org.inventorymanagement.product.model.Option;
import org.inventorymanagement.product.service.OptionService;
import org.inventorymanagement.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController()
@CrossOrigin
@RequestMapping("/options")
public class OptionController {

    @Autowired
    OptionService service;

    @Autowired
    ProductService productService;
    

    @PostMapping
    public Option addOption(@Valid @RequestBody Option option) {
        return service.insertOption(option);
    }
    
    @GetMapping("/{formUrl}/{optionUrl}")
    public Option getOptionByOptionName(@PathVariable("formUrl") String formUrl, @PathVariable("optionUrl") String optionUrl) {
        return service.getOptionByUrl(formUrl, optionUrl);
    }

    @PostMapping("/{formUrl}")
    public Map<String, Object> getOptions(@RequestBody Filter req, @PathVariable("formUrl") String formUrl) {

        Integer pageNumber = req.getPageNumber() == null ? 0 : req.getPageNumber();
        Integer recordsPerPage = req.getRecordsPerPage() == null ? 5 : req.getRecordsPerPage();
        String sortBy = req.getSortBy() == null || req.getSortBy().equals("0")  ? "optionName" : req.getSortBy();
        String isDescending = req.getDescending() == null ? "false" : req.getDescending();
        String searchText = req.getSearchText() == null ? "" : req.getSearchText();
        List<FilterOptions> filters = req.getFilter() == null ? new ArrayList<>() : req.getFilter();
        log.info("I am here");
        log.info("{}", req);

        return productService.getProducts(
            formUrl, pageNumber, recordsPerPage, sortBy, isDescending, searchText, filters, false);

    }

}
