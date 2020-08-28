package org.inventorymanagement.product.model;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.HashMap;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Document(collection = "products")
public class Product {
    @Id
    @JsonProperty("uid")
    private String _id;

    //TODO: make id unique
    @NotBlank(message = "Product ID must not be null or empty")
    @Indexed(unique = true)
    private String productId;

    @NotBlank(message = "Product name must not be null or empty")
    private String productName;

    private String description;

    private String image;

//    @NotNull(message = "Product cost must not be null")
    private Double cost;

    HashMap<String, String> productDetails;

//    @NotNull(message = "Quantity in stock must not be null")
    private Integer quantityInStock;

    private Integer quantityInTransit;

    private Integer ratings;

    //TODO: handle when number of ratings are zero
    private Integer numberOfRatings;

    private List<String> reviews;

    private Integer benchmark;
    
    @NotNull(message = "Form Id cannot be null")
    private String formId;

}
