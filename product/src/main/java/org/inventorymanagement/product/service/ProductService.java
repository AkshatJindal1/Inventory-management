package org.inventorymanagement.product.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.inventorymanagement.product.exceptionhandler.ProductIdMismatchException;
import org.inventorymanagement.product.model.Product;
import org.inventorymanagement.product.repository.MongoConnection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public class ProductService {

    @Autowired
    private MongoOperations mongoOps;


    @Autowired
    MongoConnection repository;

    public Product insertProduct(Product product) {

        return repository.save(product);
    }

    public Map<String, Object> getProducts(
            Integer pageNumber,
            Integer recordsPerPage,
            String sortBy,
            String descending,
            Map<String,List<String>> filter) {

        Pageable pageableRequest = PageRequest.of(pageNumber, recordsPerPage, Sort.by(sortBy));
        if(descending.equals("true"))
            pageableRequest = PageRequest.of(pageNumber, recordsPerPage, Sort.by(sortBy).descending());

        Query query = new Query();
        Criteria expression = new Criteria();
        for(Map.Entry<String, List<String>> entry: filter.entrySet()) {
            String key = entry.getKey();
            List<String> values = entry.getValue();
            expression.andOperator(Criteria.where(key).in(values));
        }
        query.addCriteria(expression);
        Map<String, Object> resp =  new HashMap<>();
        resp.put("totalProducts", mongoOps.count(query, Product.class));
        query.with(pageableRequest);
        List<Product> products = mongoOps.find(query, Product.class);
        resp.put("response",products);
        return resp;
    }

    public Product getProductById(String id) {

        return repository.findByProductId(id);
    }

    public Product updateProductById(String id, Product product) {

        if(!product.getProductId().equals(id)) {
            throw new ProductIdMismatchException("Product id  does not match with the request body");
        }
        Product oldProduct = getProductById(id);
        if(oldProduct == null)
            return repository.save(product);

        product.set_id(oldProduct.get_id());
        return repository.save(product);
    }

}
