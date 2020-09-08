package org.inventorymanagement.product.repository;

import java.util.List;

import javax.annotation.PostConstruct;

import org.inventorymanagement.product.model.Datatype;
import org.inventorymanagement.product.model.Option;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.TextIndexDefinition;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OptionRepository extends MongoRepository<Option, String> {

	Option findByName(String optiontName);
	
	Option findByUrlAndFormId(String optionName, String formId);
	
	List<Datatype> findByFormId(String formId);

	boolean existsByUrl(String candidate);
	
	@Configuration
	@DependsOn("mongoTemplate")
	public class CollectionsConfig {

		@Autowired
		private MongoTemplate mongoTemplate;

		@PostConstruct
		public void initIndexes() {
			TextIndexDefinition textIndex = new TextIndexDefinition.TextIndexDefinitionBuilder()
					.onField("$**")
					.build();
			mongoTemplate.indexOps("options")
					.ensureIndex(textIndex);
		}
	}

}
