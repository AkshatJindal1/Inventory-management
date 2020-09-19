package org.inventorymanagement.product.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@JsonIgnoreProperties(ignoreUnknown = true)
public class SalePerProduct {

	@JsonProperty("uid")
	private String _id;

	private String productId;

	private String productName;

	private Integer quantity;

	private Double unitCost;

	private Double totalCost;

	private Boolean isValid(String str) {
		return str != null && !str.trim().isEmpty();
	}

	private Boolean isValid(Integer str) {
		return str != null && str > 0;
	}

	@JsonIgnore
	public Boolean isValid() {
		return isValid(productId) && isValid(productName) && isValid(quantity);

	}

}
