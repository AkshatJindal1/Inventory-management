package org.inventorymanagement.product.repository;

import org.inventorymanagement.product.model.Product;
import org.inventorymanagement.product.model.Sale;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.Index;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;

@Repository
public interface SaleRepository extends MongoRepository<Sale, String> {

  Sale findBySalesId(String salesId);

  Sale findByUrlAndFormId(String url, String formId);
  boolean existsByUrl(String candidate);

  @Configuration
  @DependsOn("mongoTemplate")
  class CollectionsConfig {

    @Autowired
    private MongoTemplate mongoTemplate;

    @PostConstruct
    public void initIndexes() {
      mongoTemplate.indexOps("sales")
          .ensureIndex(
              new Index().on("salesId", Sort.Direction.ASC).unique()
          );
    }
  }


}
