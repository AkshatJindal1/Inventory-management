package org.inventorymanagement.product.repository;

import org.inventorymanagement.product.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepository extends MongoRepository<Product, String> {

	Product findByProductId(String productId);

	Product findByUrlAndFormId(String url, String formId);

	boolean existsByUrl(String candidate);

	boolean existsBy_idAndFormId(String id, String formId);

	Boolean existsByProductNameAndFormId(String productName, String formId);

	Product findBy_idAndFormId(String get_id, String formId);

	boolean existsByProductIdAndFormId(String productId, String formId);

	void deleteBy_idAndFormId(String id, String formId);
	
}
