package org.inventorymanagement.product.repository;

import java.util.List;

import org.inventorymanagement.product.model.Product;
import org.inventorymanagement.product.model.ProductAsOption;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface ProductRepository extends MongoRepository<Product, String> {

	Product findByProductId(String productId);

	Product findByUrlAndFormId(String url, String formId);

	boolean existsByUrl(String candidate);

	boolean existsBy_idAndFormId(String id, String formId);

	Boolean existsByProductNameAndFormId(String productName, String formId);

	Product findBy_idAndFormId(String get_id, String formId);

	boolean existsByProductIdAndFormId(String productId, String formId);

	void deleteBy_idAndFormId(String id, String formId);

	@Query(value = "{$and: [{clientName: ?0}, { $or : [{ productId : {$regularExpression: { pattern : ?1, options : i }}}, { productName : { $regularExpression : { pattern : ?1, options : i}}}]}]}", 
			fields = "{productId:1, productName: 1, cost:1, _id:1}")
	List<ProductAsOption> getBySearchTextAndClient(String client, String searchText, PageRequest pageRequest);

}
