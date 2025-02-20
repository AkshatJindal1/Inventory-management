package org.inventorymanagement.product.model;

import java.util.List;

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
@Document(collection = "forms")
@ToString
public class Form {

//	TODO Datatypes overflow

	@Id
	@JsonProperty("formId")
	private String _id;
	
	private String url;
	private Model model;
	
	private String name;
	
	private List<Field> fields;
	
	private String client;
	
	@JsonIgnore
	private String nameClient;
	
}
