package org.inventorymanagement.product.model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SalePerProduct {
  private String productId;
  private Integer count;
  private Double pricePerProduct;
  private Double totalPrice;
  private Double discountPerProduct;
  private Double totalDiscount;
  private Double finalPricePerProduct;
  private Double finalPrice;
}
