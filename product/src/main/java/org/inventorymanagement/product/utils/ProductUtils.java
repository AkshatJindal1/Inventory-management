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
import org.inventorymanagement.product.exceptionhandler.ProductNotFoundException;
import org.inventorymanagement.product.model.Datatype;
import org.inventorymanagement.product.model.Field;

public class ProductUtils {

	public static String[][] getDefaultOptionValuesArray() {
		String[][] defaultForms = { { "optionName", "Option Name", "text" } };
		return defaultForms;
	}

	public static String[][] getDefaultProductValuesArray() {
		String[][] defaultForms = { { "productId", "Product Id", "text" },
				{ "productName", "Product Name", "text" }, { "description", "Description", "text" },
				{ "image", "Image", "text" }, { "cost", "Cost", "number" },
				{ "quantityInStock", "Quantity in Stock", "number" },
				{ "quantityInTransit", "Quantity in Transit", "number" }, { "benchmark", "Benchmark", "number" } };
		return defaultForms;
	}

	public static String[][] getDefaultValuesArray(Boolean option) {
		return option ? getDefaultOptionValuesArray() : getDefaultProductValuesArray();
	}

	public static List<Field> getDefaultForms(Boolean option) {
		ArrayList<Field> forms = new ArrayList<>();

		String[][] defaultForms = getDefaultValuesArray(option);

		for (int i = 0; i < defaultForms.length; i++) {
			forms.add(new Field(defaultForms[i][0], defaultForms[i][1], defaultForms[i][2]));
		}
		return forms;
	}

	public static Set<String> getMandatoryIds(Boolean option) {
		List<String[]> defaultProductArray = Arrays.asList(ProductUtils.getDefaultValuesArray(option));
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

	public static Boolean getOptions(String category) {
		Boolean option;
		if (category.equals("option"))
			option = true;
		else if (category.equals("product"))
			option = false;
		else
			throw new ProductNotFoundException("Wrong Category");
		return option;
	}

	public static List<Datatype> getDefaultDatatype() {
		List<Datatype> defaultTypes = Arrays.asList(new Datatype("number", "Number"), new Datatype("text", "Text"),
				new Datatype("boolean", "Boolean"), new Datatype("email", "Email"));
		return defaultTypes;
	}

}
