package org.inventorymanagement.product.model;

import lombok.*;

import javax.persistence.Entity;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Filter {

  private String searchText;
  private Integer recordsPerPage;
  private Integer pageNumber;
  private String sortBy;
  private String descending;
  private List<FilterOptions> filter;

}
