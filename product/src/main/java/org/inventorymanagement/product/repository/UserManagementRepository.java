package org.inventorymanagement.product.repository;

import javax.annotation.PostConstruct;

import org.inventorymanagement.product.security.model.CustomUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.Index;
import org.springframework.data.mongodb.core.index.TextIndexDefinition;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserManagementRepository extends MongoRepository<CustomUser, String> {

	/*
	 * 
	 * TODO Assuming just one user per company TODO Make Sure No two different
	 * client register with same ClientName
	 * 
	 */

	CustomUser findBySubject(String subject);

	CustomUser getUserByClientName(String client);

	CustomUser getUserBySubject(String subject);

	Boolean existsByClientName(String clientName);

	CustomUser findBySubjectAndApproved(String subject, Boolean approved);

	@Configuration
	@DependsOn("mongoTemplate")
	public class CollectionsConfig {

		@Autowired
		private MongoTemplate mongoTemplate;

		@PostConstruct
		public void initIndexes() {
			mongoTemplate.indexOps("users").ensureIndex(new Index().on("subject", Sort.Direction.ASC).unique());

			TextIndexDefinition textIndex = new TextIndexDefinition.TextIndexDefinitionBuilder().onField("$**").build();
			mongoTemplate.indexOps("users").ensureIndex(textIndex);
		}
	}

}
