package org.inventorymanagement.product.repository;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.inventorymanagement.product.model.Datatype;
import org.inventorymanagement.product.model.Form;
import org.inventorymanagement.product.model.FormShort;
import org.inventorymanagement.product.model.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.Index;
import org.springframework.data.mongodb.core.index.TextIndexDefinition;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface FormRepository extends MongoRepository<Form, String> {

	public Form findByUrlAndModel(String url, Model model);

	@Query(value = "{}", fields = "{url:1, name: 1, option:1, _id:1}")
	public List<FormShort> getFormShorts();

	@Query(value = "{ option : true}", fields = "{ _id : 1, name: 1 }")
	public List<Datatype> getDatatypes();

	public List<Form> findAll();

	public void deleteBy_idIn(List<String> formIds);
	
	@Configuration
    @DependsOn("mongoTemplate")
    public class CollectionsConfig {

        @Autowired
        private MongoTemplate mongoTemplate;

        @PostConstruct
        public void initIndexes() {
            mongoTemplate.indexOps("forms")
                    .ensureIndex(
                            new Index().on("name", Sort.Direction.ASC).unique()
                    );

            TextIndexDefinition textIndex = new TextIndexDefinition.TextIndexDefinitionBuilder()
                .onField("$**")
                .build();
            mongoTemplate.indexOps("forms")
                .ensureIndex(textIndex);
        }
    }

	public boolean existsByUrl(String url);
}
