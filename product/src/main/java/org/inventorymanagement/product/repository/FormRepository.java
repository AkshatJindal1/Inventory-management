package org.inventorymanagement.product.repository;

import java.util.List;

import org.inventorymanagement.product.model.Datatype;
import org.inventorymanagement.product.model.Form;
import org.inventorymanagement.product.model.FormShort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface FormRepository extends MongoRepository<Form, String> {

	public Form findByUrlAndOption(String url, Boolean option);

	@Query(value = "{}", fields = "{url:1, name: 1, option:1, _id:1}")
	public List<FormShort> getFormShorts();

	@Query(value = "{ option : true}", fields = "{ _id : 1, name: 1 }")
	public List<Datatype> getDatatypes();
	
	public List<Form> findAll();

	public void deleteBy_idIn(List<String> formIds);

}
