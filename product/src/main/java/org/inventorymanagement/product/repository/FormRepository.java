package org.inventorymanagement.product.repository;


import java.util.List;

import org.inventorymanagement.product.model.Form;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;


public interface FormRepository extends MongoRepository<Form, String> {

	public Form findByUrlAndOption(String url, Boolean option);

	@Query(value="{ path : ?0}", fields="{ path : 0 }")
	public List<String> getDatatypes();
	
}
