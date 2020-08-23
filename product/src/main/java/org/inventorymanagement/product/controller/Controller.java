package org.inventorymanagement.product.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.inventorymanagement.product.exceptionhandler.ProductNotFoundException;
import org.inventorymanagement.product.model.Product;
import org.inventorymanagement.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController()
@CrossOrigin
@RequestMapping("/products")
public class Controller {

    @Autowired
    ProductService service;

    @PostMapping
    public Product addProduct(@Valid @RequestBody Product product) {
        return service.insertProduct(product);
    }

    @GetMapping("/{productId}")
    public Product getProductById(@PathVariable("productId") String productId) {

        Product product = service.getProductById(productId);
        if(product == null)
            throw new ProductNotFoundException("Product with given ID not present");
        return product;
    }

    //TODO: Add pagenation for number of products
    @GetMapping
    public Map<String, Object> getProducts(@RequestBody Map<String, Object> req) {

        return service.getProducts(
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


}
