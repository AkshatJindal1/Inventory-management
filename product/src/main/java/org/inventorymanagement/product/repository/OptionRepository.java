package org.inventorymanagement.product.repository;

import java.util.List;

import org.inventorymanagement.product.model.Datatype;
import org.inventorymanagement.product.model.Option;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OptionRepository extends MongoRepository<Option, String> {

	Option findByName(String name);

	Option findByUrlAndFormId(String url, String formId);

	List<Datatype> findByFormId(String formId);

	boolean existsByUrl(String candidate);

	boolean existsByNameAndFormId(String name, String formId);

	Option findBy_idAndFormId(String get_id, String formId);

	void deleteBy_idAndFormId(String id, String formId);

}
