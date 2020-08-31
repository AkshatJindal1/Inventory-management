package org.inventorymanagement.product.repository;

import org.inventorymanagement.product.model.Option;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OptionRepository extends MongoRepository<Option, String> {

	Option findByOptionName(String optiontName);
	
	Option findByOptionUrlAndFormId(String optionName, String formId);

}
