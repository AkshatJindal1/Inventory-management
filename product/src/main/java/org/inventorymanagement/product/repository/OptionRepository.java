package org.inventorymanagement.product.repository;

import java.util.List;

import org.inventorymanagement.product.model.Datatype;
import org.inventorymanagement.product.model.Option;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OptionRepository extends MongoRepository<Option, String> {

	Option findByName(String optiontName);
	
	Option findByOptionUrlAndFormId(String optionName, String formId);
	
	List<Datatype> findByFormId(String formId);

}
