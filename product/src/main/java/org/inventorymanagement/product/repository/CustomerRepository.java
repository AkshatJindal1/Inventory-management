package org.inventorymanagement.product.repository;

import java.util.List;

import org.inventorymanagement.product.model.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface CustomerRepository extends MongoRepository<Customer, String> {

	@Query(value = "{$and: [{client: ?0}, { name : {$regularExpression: { pattern : ?1, options : i }}}]}")
	List<Customer> getBySearchTextAndClient(String client, String searchText);
}
