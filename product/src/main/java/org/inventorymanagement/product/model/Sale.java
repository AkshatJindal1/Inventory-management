package org.inventorymanagement.product.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Document(collection = "sales")
public class Sale {

  @Id
  @JsonProperty("uid")
  private String _id;

  @NotBlank(message = "Sales ID must not be null or empty")
  @Indexed(unique = true)
  private String salesId;
  private String url;
  @NotNull(message = "Form Id cannot be null")
  private String formId;
  private String salesDate;
  private Double amount;
  private Double discount;
  private Double netAmount;
  private List<SalePerProduct> products;
  private String customerPhone;
  private String customerEmail;
  private String customerName;
  private String client;
}
