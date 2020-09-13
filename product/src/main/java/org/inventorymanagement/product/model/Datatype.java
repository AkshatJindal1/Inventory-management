package org.inventorymanagement.product.model;

import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Datatype {

	@Id
	@JsonProperty("id")
	private String _id;
	
	@JsonProperty("title")
	private String name;

}
