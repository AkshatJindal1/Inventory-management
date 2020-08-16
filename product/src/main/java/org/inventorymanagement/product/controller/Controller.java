package org.inventorymanagement.product.controller;

import org.inventorymanagement.product.model.Product;
import org.inventorymanagement.product.srevice.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/products")
public class Controller {

    @Autowired
    ProductService service;

    @PostMapping
    public void addProduct(@RequestBody Product product) {
        service.insertProduct(product);
    }

    @GetMapping("/{productId}")
    public Product getProductById(@PathVariable("productId") String productId) {
        return service.getProductById(productId);
    }

    //TODO: Add pagenation for number of products
    @GetMapping
    public List<Product> getProducts() {
        return service.getProducts();
    }


}
