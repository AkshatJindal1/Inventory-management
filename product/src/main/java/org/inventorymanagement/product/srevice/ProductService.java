package org.inventorymanagement.product.srevice;

import org.inventorymanagement.product.model.Product;
import org.inventorymanagement.product.repository.MongoConnection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProductService {

    @Autowired
    MongoConnection repository;

    public void insertProduct(Product product) {

        repository.save(product);
    }

    public List<Product> getProducts() {

        return repository.findAll();
    }

    public Product getProductById(String id) {

        return repository.findByProductId(id);
    }

}
