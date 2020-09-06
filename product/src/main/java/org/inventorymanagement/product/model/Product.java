package org.inventorymanagement.product.model;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Document(collection = "products")
@JsonPropertyOrder({
	"uid", "productId", "productName"
})
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

    private Double cost;

	private Long quantityInStock;

    private Long quantityInTransit;

    private Integer ratings;

    private Integer numberOfRatings;

    private List<String> reviews;

    private Long benchmark;
    
    @NotNull(message = "Form Id cannot be null")
    private String formId;
    
    private String url;

    private Map<String, Object> productDetails = new HashMap<String, Object>();

    @JsonAnyGetter
    public Map<String, Object> otherFields() {
        return productDetails;
    }

    @JsonAnySetter
    public void setOtherField(String name, Object value) {
    	System.out.println(name);
    	productDetails.put(name, value);
    }
    
}
