package org.inventorymanagement.product.model;

import java.util.Date;
import java.util.List;

import javax.validation.constraints.NotBlank;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Document(collection = "sales")
public class Sale {

	@Transient
	public static final String SEQUENCE_NAME = "sale_sequence";

	@Id
	@JsonProperty("uid")
	private String _id;

	@NotBlank(message = "Sales ID must not be null or empty")
	@Indexed(unique = true)
	private Long salesId;

	private Date salesDate;

	private List<SalePerProduct> products;

	private Customer customer;

	private String client;

}
