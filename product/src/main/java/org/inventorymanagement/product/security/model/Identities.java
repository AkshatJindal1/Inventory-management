package org.inventorymanagement.product.security.model;

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
public class Identities {

	@JsonProperty("user_id")
	private String user_id;
	private String provider;
	private String connection;
	private Boolean isSocial;

}
