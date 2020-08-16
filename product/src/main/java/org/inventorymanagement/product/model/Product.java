package org.inventorymanagement.product.model;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.stereotype.Indexed;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Document(collection = "products")
public class Product {
    @Id
    String _id;
    //TODO: make id unique
    String productId;
    String productName;
    String description;
    String image;
    Double cost;
    String color;
    String size;
    Integer inStock;
    Integer inTransit;
    String materialType;
    Integer ratings;
    //TODO: handle when number of ratings are zero
    Integer numberOfRatings;
    //TODO: Convert it into array pf reviews
    String reviews;
    Integer benchmark;


}
