package org.inventorymanagement.product.repository;

import org.inventorymanagement.product.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface MongoConnection extends MongoRepository<Product, String> {

    Optional<Product> findByProductId(String productId);

}
