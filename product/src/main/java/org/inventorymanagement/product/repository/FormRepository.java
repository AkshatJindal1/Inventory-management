package org.inventorymanagement.product.repository;

import java.util.List;

import javax.annotation.PostConstruct;

import org.inventorymanagement.product.model.Datatype;
import org.inventorymanagement.product.model.Form;
import org.inventorymanagement.product.model.FormShort;
import org.inventorymanagement.product.model.Model;
import org.inventorymanagement.product.utils.ProductUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.Index;
import org.springframework.data.mongodb.core.index.TextIndexDefinition;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface FormRepository extends MongoRepository<Form, String> {

	public Form findByUrlAndModelAndClient(String url, Model model, String client);

	public Form findByUrlAndModel(String url, Model model);

	@Query(value = "{client: ?0}", fields = "{url:1, name: 1, model:1, _id:1}")
	public List<FormShort> getFormShorts(String client);

	@Query(value = "{ model : OPTION, client: ?0}", fields = "{ _id : 1, name: 1 }")
	public List<Datatype> getDatatypes(String client);

	public List<Form> findAll();

	public void deleteBy_idInAndClient(List<String> formIds, String client);
	
	public boolean existsByUrlAndClient(String url, String client);
	
	public boolean existsBy_idAndClient(String formId, String client);

}
