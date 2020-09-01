package org.inventorymanagement.product.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import lombok.extern.slf4j.Slf4j;
import org.inventorymanagement.product.exceptionhandler.ProductNotFoundException;
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
    public Map<String, Object> getProducts(@RequestBody Map<String, Object> req, @PathVariable("formUrl") String formUrl) {
        return service.getProducts(
                formUrl,
                Integer.parseInt(req.getOrDefault("pageNumber","0").toString()),
                Integer.parseInt(req.getOrDefault("recordsPerPage", "5").toString()),
                req.getOrDefault("sortBy", "productId").toString(),
                req.getOrDefault("descending", "false").toString(),
                new ObjectMapper().convertValue(req.getOrDefault("filter", new HashMap<>()), Map.class));
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
