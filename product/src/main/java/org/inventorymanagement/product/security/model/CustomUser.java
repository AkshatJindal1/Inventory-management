package org.inventorymanagement.product.security.model;

import org.inventorymanagement.product.model.DefaultTemplates;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
@Document(collection = "users")
public class CustomUser {

	@Id
	@JsonIgnore
	private String _id;

	@JsonIgnore
	private String subject;

	private String clientName;

	@JsonIgnore
	private DefaultTemplates defaultTemplates;

	@JsonIgnore
	private Boolean approved = false;

	private Boolean templateSelected = false;
}
