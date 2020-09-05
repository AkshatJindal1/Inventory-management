package org.inventorymanagement.product.model;

import lombok.*;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FilterOptions {
    private Map<String, Object> options;
    private String id;
    private List<Object> selected;

}
