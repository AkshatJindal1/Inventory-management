package org.inventorymanagement.product.security.model;

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
public class Claims {

	private String iss;
	private String sub;
	private String[] aud;
	private String iat;
	private String exp;
	private String azp;
	private String scope;

}
