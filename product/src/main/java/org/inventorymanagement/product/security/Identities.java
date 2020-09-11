package org.inventorymanagement.product.security;

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

	private String user_id;
	private String provider;
	private String connection;
	private Boolean isSocial;

}
