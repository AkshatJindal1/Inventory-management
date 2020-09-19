package org.inventorymanagement.product.repository;

import org.inventorymanagement.product.model.Sale;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaleRepository extends MongoRepository<Sale, String> {

}
