package org.inventorymanagement.product.security.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter 
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Document(collection = "users")
public class CustomUser {
	
	@Id
	@JsonProperty("id")
	private String _id;
	
	@JsonProperty("subject")
	private String subject;
	
	@JsonProperty("client_name")
	private String clientName;

}
