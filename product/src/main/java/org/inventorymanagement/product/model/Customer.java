package org.inventorymanagement.product.model;

import javax.persistence.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Document(collection = "customer")
@ToString
public class Customer {

	public static final String SEQUENCE_NAME = "customer_sequence";

	@Id
	@JsonProperty("customerId")
	private String _id;

	private String name;
	private String phone;
	private String email;

	@JsonIgnore
	private String client;

}
