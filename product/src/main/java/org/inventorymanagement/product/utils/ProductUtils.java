package org.inventorymanagement.product.utils;

import java.text.Normalizer;
import java.text.Normalizer.Form;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.apache.commons.text.CaseUtils;
import org.inventorymanagement.product.model.Field;

public class ProductUtils {

	public static String[][] getDefaultValuesArray() {
		String[][] defaultForms = { { "productId", "Product Id", "text" }, { "description", "Description", "text" },
				{ "image", "Image", "text" }, { "cost", "Cost", "number" },
				{ "quantityInStock", "Quantity in Stock", "number" },
				{ "quantityInTransit", "Quantity in Transit", "number" }, { "benchmark", "Benchmark", "number" } };
		return defaultForms;
	}

	public static List<Field> getDefaultForms() {
		ArrayList<Field> forms = new ArrayList<>();

		String[][] defaultForms = getDefaultValuesArray();

		for (int i = 0; i < defaultForms.length; i++) {
			forms.add(new Field(defaultForms[i][0], defaultForms[i][1], defaultForms[i][2]));
		}
		return forms;
	}

	public static Set<String> getMandatoryIds() {
		List<String[]> defaultProductArray = Arrays.asList(ProductUtils.getDefaultValuesArray());
		return defaultProductArray.stream().map(field -> field[0]).collect(Collectors.toSet());
	}

	public static String generateId(String labelText, String id) {
		if (id == null || id.trim().equalsIgnoreCase(""))
			return CaseUtils.toCamelCase(labelText, false);
		return id;
	}

	public static String generateId(String labelText) {
		return generateId(labelText, null);
	}

	public static String toSlug(String input) {
		
		// Find a better slugify-algo

		final Pattern NONLATIN = Pattern.compile("[^\\w-]");
		final Pattern WHITESPACE = Pattern.compile("[\\s]");
		
		String nowhitespace = WHITESPACE.matcher(input).replaceAll("-");
		String normalized = Normalizer.normalize(nowhitespace, Form.NFD);
		String slug = NONLATIN.matcher(normalized).replaceAll("");
		return slug.toLowerCase(Locale.ENGLISH);
	}

}
