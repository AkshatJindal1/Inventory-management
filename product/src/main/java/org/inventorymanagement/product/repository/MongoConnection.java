package org.inventorymanagement.product.repository;

import org.inventorymanagement.product.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface MongoConnection extends MongoRepository<Product, String> {

    Product findByProductId(String productId);

}
