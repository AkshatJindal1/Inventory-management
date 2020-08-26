package org.inventorymanagement.product.utils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.apache.commons.text.CaseUtils;
import org.inventorymanagement.product.model.Form;

public class ProductUtils {

	public static String[][] getDefaultValuesArray() {
		String[][] defaultForms = {
				{ "productId", "Product Id", "text"},
				{ "description", "Description", "text"},
				{ "image", "Image", "text"},
				{ "cost", "Cost", "number"},
				{ "quantityInStock", "Quantity in Stock", "number"},
				{ "quantityInTransit", "Quantity in Transit", "number"},
				{ "benchmark", "Benchmark", "number"}
		};
		return defaultForms;
	}	
	
	public static List<Form> getDefaultForms() {
		ArrayList<Form> forms = new ArrayList<>();
		
		String[][] defaultForms = getDefaultValuesArray();
		
		for(int i=0;i<defaultForms.length;i++) {
			forms.add(new Form(defaultForms[i][0], defaultForms[i][1], defaultForms[i][2]));
		}
		return forms;
	}

	public static Set<String> getMandatoryIds() {
		List<String[]> defaultProductArray = Arrays.asList(ProductUtils.getDefaultValuesArray());
		return defaultProductArray.stream().map(field -> field[0]).collect(Collectors.toSet());
	}
	
	public static String generateId(String labelText, String id) {
		if(id==null) return CaseUtils.toCamelCase(labelText, false);
		return id;
	}
	
}
