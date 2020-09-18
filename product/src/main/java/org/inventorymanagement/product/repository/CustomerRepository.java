package org.inventorymanagement.product.repository;

import org.inventorymanagement.product.model.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CustomerRepository extends MongoRepository<Customer, String> {

}
