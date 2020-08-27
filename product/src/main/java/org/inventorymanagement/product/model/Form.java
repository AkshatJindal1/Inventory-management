package org.inventorymanagement.product.model;

import java.util.List;

import javax.persistence.Entity;

import org.springframework.data.annotation.Id;
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
	
	@Id
	@JsonProperty("formId")
	private String _id;
	private String formName;
	private List<Field> fields;

	public Form(String formName, List<Field> fields) {
		super();
		this.formName = formName;
		this.fields = fields;
	}
	
}
