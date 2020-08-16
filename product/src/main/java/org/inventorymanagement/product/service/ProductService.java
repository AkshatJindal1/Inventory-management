package org.inventorymanagement.product.service;

import org.inventorymanagement.product.exceptionhandler.ProductIdMismatchException;
import org.inventorymanagement.product.exceptionhandler.ProductNotFoundException;
import org.inventorymanagement.product.model.Product;
import org.inventorymanagement.product.repository.MongoConnection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

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

        return repository.findByProductId(id);
    }

    public Product updateProductById(String id, Product product) {

        if(!product.getProductId().equals(id)) {
            throw new ProductIdMismatchException("Product id  does not match with the request body");
        }
        Product oldProduct = getProductById(id);
        if(oldProduct == null)
            return repository.save(product);

        product.set_id(oldProduct.get_id());
        return repository.save(product);
    }

}
