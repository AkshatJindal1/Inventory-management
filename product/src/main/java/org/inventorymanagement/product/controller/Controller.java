package org.inventorymanagement.product.controller;

import org.inventorymanagement.product.exceptionhandler.ProductNotFoundException;
import org.inventorymanagement.product.model.Product;
import org.inventorymanagement.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController()
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
    public List<Product> getProducts() {
        return service.getProducts();
    }

    @PutMapping("/{productId}")
    public Product updateProduct(@RequestBody Product product, @PathVariable("productId") String productId) {

        return service.updateProductById(productId, product);
    }


}
