package org.inventorymanagement.product.model;


import java.util.HashMap;
import java.util.Map;

import javax.persistence.Entity;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Document(collection = "options")
public class Option {
	
    @Id
    @JsonProperty("uid")
    private String _id;
    
    private String optionUrl;

    @NotBlank(message = "Option name must not be null or empty")
    @JsonProperty("optionName")
    private String name;
    
    @NotNull(message = "Form Id cannot be null")
    private String formId;
    
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
