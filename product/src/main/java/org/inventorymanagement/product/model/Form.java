package org.inventorymanagement.product.model;

import java.util.List;

import javax.persistence.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

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
	
	@Indexed(unique = true)
	private String name;
	private List<Field> fields;

	public Form(String url, Model model, String name, List<Field> fields) {
		super();
		this.url = url;
		this.model = model;
		this.name = name;
		this.fields = fields;
	}

}
