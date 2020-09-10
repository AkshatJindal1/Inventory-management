package org.inventorymanagement.product.model;

import com.fasterxml.jackson.annotation.JsonProperty;

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
public class FormShort {
	
	@JsonProperty("uid")
	private String _id;
	private String url;
	private String name;
	private Model model;

}
