package org.inventorymanagement.product.model;

import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Document(collection = "database_sequences")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class DatabaseSequence {

	@Id
	private String id;

	private long seq;

}