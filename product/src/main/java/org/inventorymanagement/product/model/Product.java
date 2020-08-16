package org.inventorymanagement.product.model;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Document(collection = "products")
public class Product {
    @Id
    private String _id;

    //TODO: make id unique
    @NotBlank(message = "Product ID must not be null or empty")
    @Indexed(unique = true)
    private String productId;

    @NotBlank(message = "Product name must not be null or empty")
    private String productName;

    private String description;

    private String image;

    @NotNull(message = "Product cost must not be null")
    private Double cost;

    private String color;

    private String size;

    private String materialType;

    @NotNull(message = "Quantity in stock must not be null")
    private Integer quantityInStock;

    private Integer quantityInTransit;

    private Integer ratings;

    //TODO: handle when number of ratings are zero
    private Integer numberOfRatings;

    private List<String> reviews;

    private Integer benchmark;


}
