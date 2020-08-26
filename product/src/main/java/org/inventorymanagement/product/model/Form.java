package org.inventorymanagement.product.model;

import javax.persistence.Entity;
import javax.validation.constraints.NotBlank;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Document(collection = "forms")
public class Form {
	
    @Id
    private String _id;
    
    @Indexed(unique=true)
    private String id;
    
    @NotBlank(message = "Product name must not be null or empty")
    private String labelText;
    
    @NotBlank(message = "Product name must not be null or empty")
    private String datatype="text";
    
    private Boolean error=false;
    private Boolean disabled=false;
    private Boolean requried=false;
    private String defaultValue;
    private Conditions conditions;

}
