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
	private String _id;

	@Indexed(unique = true)
	private String id;

	@NotBlank(message = "Label cannot be empty")
	private String labelText;

	@NotBlank(message = "Datatype cannot be empty")
	private String datatype = "text";

	private Boolean error = false;
	private Boolean disabled = false;
	private Boolean required = false;
	private String defaultValue;
	private Conditions conditions = new Conditions();

	public Form(String id, String labelText, String datatype) {
		this.id = id;
		this.labelText = labelText;
		this.datatype = datatype;
	}
}
