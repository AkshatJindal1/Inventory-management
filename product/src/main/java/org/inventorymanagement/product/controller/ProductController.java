package org.inventorymanagement.product.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import lombok.extern.slf4j.Slf4j;
import org.inventorymanagement.product.exceptionhandler.ProductNotFoundException;
import org.inventorymanagement.product.model.Filter;
import org.inventorymanagement.product.model.FilterOptions;
import org.inventorymanagement.product.model.Product;
import org.inventorymanagement.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.databind.ObjectMapper;

@Slf4j
@RestController()
@CrossOrigin
@RequestMapping("/products")
public class ProductController {

    @Autowired
    ProductService service;

    @PostMapping
    public Product addProduct(@Valid @RequestBody Product product) {
        return service.insertProduct(product);
    }
    

    @GetMapping("/{formUrl}/{productUrl}")
    public Product getOptionByOptionName(@PathVariable("formUrl") String formUrl, @PathVariable("productUrl") String productUrl) {
        return service.getProductByUrl(formUrl, productUrl);
    }

    @PostMapping("/{formUrl}")
    public Map<String, Object> getProducts(@RequestBody Filter req, @PathVariable("formUrl") String formUrl) {

        Integer pageNumber = req.getPageNumber() == null ? 0 : req.getPageNumber();
        Integer recordsPerPage = req.getRecordsPerPage() == null ? 5 : req.getRecordsPerPage();
        String sortBy = req.getSortBy() == null || req.getSortBy().equals("0")  ? "productId" : req.getSortBy();
        String isDescending = req.getDescending() == null ? "false" : req.getDescending();
        String searchText = req.getSearchText() == null ? "" : req.getSearchText();
        List <FilterOptions> filters = req.getFilter() == null ? new ArrayList<>() : req.getFilter();
        log.info("{}", req);
        log.info("{} {} {} {} {} {}", pageNumber, recordsPerPage, sortBy, isDescending, searchText, filters);

        return service.getProducts(
                formUrl, pageNumber, recordsPerPage, sortBy, isDescending, searchText, filters, true);

    }

    @PutMapping("/{productId}")
    public Product updateProduct(@RequestBody Product product, @PathVariable("productId") String productId) {

        return service.updateProductById(productId, product);
    }

    @GetMapping("/{formUrl}/min-max/")
    public Map<String, List> getMaxMinValue(@PathVariable("formUrl") String formUrl, @RequestParam("sortFields") List<String> sortFields) {
        return service.getMaxMinValue(formUrl, sortFields);
    }


}
