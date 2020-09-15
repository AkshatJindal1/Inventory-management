package org.inventorymanagement.product.repository;

import javax.annotation.PostConstruct;

import org.inventorymanagement.product.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.Index;
import org.springframework.data.mongodb.core.index.TextIndexDefinition;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepository extends MongoRepository<Product, String> {

    Product findByProductId(String productId);

    @Configuration
    @DependsOn("mongoTemplate")
    public class CollectionsConfig {

        @Autowired
        private MongoTemplate mongoTemplate;

        @PostConstruct
        public void initIndexes() {
            mongoTemplate.indexOps("products")
                    .ensureIndex(
                            new Index().on("productId", Sort.Direction.ASC).unique()
                    );

            TextIndexDefinition textIndex = new TextIndexDefinition.TextIndexDefinitionBuilder()
                .onField("$**")
                .build();
            mongoTemplate.indexOps("products")
                .ensureIndex(textIndex);
        }
    }

	Product findByUrlAndFormId(String url, String formId);
	boolean existsByUrl(String candidate);

}
