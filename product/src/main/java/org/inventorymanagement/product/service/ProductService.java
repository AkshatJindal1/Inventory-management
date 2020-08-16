package org.inventorymanagement.product.service;

import org.inventorymanagement.product.model.Product;
import org.inventorymanagement.product.repository.MongoConnection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class ProductService {

    @Autowired
    MongoConnection repository;

    public Product insertProduct(Product product) {

        return repository.save(product);
    }

    public List<Product> getProducts() {

        return repository.findAll();
    }

    public Product getProductById(String id) {

        return repository.findByProductId(id).orElseThrow(ProductNotFoundException::new);
    }

}
