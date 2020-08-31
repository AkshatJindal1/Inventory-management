package org.inventorymanagement.product.model;

import java.util.List;

import javax.persistence.Entity;
import javax.validation.constraints.NotBlank;

import org.springframework.data.mongodb.core.index.Indexed;

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
public class Field {

	@Indexed(unique = true)
	private String id;

	@NotBlank(message = "Label cannot be empty")
	private String labelText;

	@NotBlank(message = "Datatype cannot be empty")
	private String datatype = "text";

	private Boolean disabled = false;
	private Boolean required = false;
	private Conditions conditions = new Conditions();
	private List<Datatype> menuitems;
	
	public Field(String id, String labelText, String datatype) {
		this.id = id;
		this.labelText = labelText;
		this.datatype = datatype;
		this.disabled = true;
	}
}
