package org.inventorymanagement.product.model;

import java.util.Date;
import java.util.List;

import javax.validation.constraints.NotBlank;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

	
	/*
	 * TODO Benchmark -> Notification ( Message or Email)
	 * 
	 * TODO Remove Quantity in Transit
	 * 
	 * TODO No Back for set-profile
	 * 
	 * TODO Return 2 decimal
	 * 
	 * TODO Add Symbol Currency
	 * 
	 * TODO Image Picker, Auto Reduce Size
	 * 
	 * TODO Branch Option
	 * 
	 * TODO Options in Forms as well
	 * 
	 */
	
	
	@Transient
	public static final String SEQUENCE_NAME = "sale_sequence";

	@Id
	@JsonProperty("uid")
	private String _id;

	@NotBlank(message = "Sales ID must not be null or empty")
	@Indexed(unique = true)
	private Long salesId;

	
	private Date salesDate;

	@JsonIgnore
	private List<SalePerProduct> products;

	@JsonIgnore
	private Customer customer;

	@JsonIgnore
	private String client;
	
	public int getSaleCount() {
		return products.size();
	}
	
	public String getCustomerName() {
		return customer.getName();
	}
	
	public String getCustomerPhone() {
		return customer.getPhone();
	}
	
	public String getCustomerEmail() {
		return customer.getEmail();
	}
	

}
