package org.inventorymanagement.product.utils;

import java.text.Normalizer;
import java.text.Normalizer.Form;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Random;
import java.util.Set;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.apache.commons.text.CaseUtils;
import org.inventorymanagement.product.exceptionhandler.ProductNotFoundException;
import org.inventorymanagement.product.model.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class ProductUtils {

	public static Object[][] getDefaultOptionValuesArray() {
		Object[][] defaultForms = { { "optionName", "Option Name", "text", true } };
		return defaultForms;
	}

	public static Object[][] getDefaultProductValuesArray() {
		Object[][] defaultForms = { { "productId", "Product Id", "text", true },
				{ "productName", "Product Name", "text", true }, { "description", "Description", "text", false },
				{ "image", "Image", "text", false }, { "cost", "Cost", "number", false },
				{ "quantityInStock", "Quantity in Stock", "number", false },
				{ "quantityInTransit", "Quantity in Transit", "number", false },
				{ "benchmark", "Benchmark", "number", false } };
		return defaultForms;
	}

	public static Object[][] getDefaultSalesValuesArray() {
		Object[][] defaultForms = {
				{ "amount", "Amount", "number", true},
				{ "discount", "Discount", "number", false },
				{ "netAmount", "Net Amount", "number", true },
				{ "customerPhone", "Customer Phone Number", "text", false },
				{ "customerEmail", "Customer Email", "text", false },
				{ "customerName", "Customer Name", "text", false },
		};
		return defaultForms;
	}

	public static Object[][] getDefaultValuesArray(Model model) {
		switch(model) {
			case PRODUCT:
				return getDefaultProductValuesArray();
			case OPTION:
				return getDefaultOptionValuesArray();
			case SALE:
				return getDefaultSalesValuesArray();
			default:
				throw new ProductNotFoundException("Wrong Category");
		}
	}

	public static List<Field> getDefaultForms(Model model) {
		ArrayList<Field> forms = new ArrayList<>();

		Object[][] defaultForms = getDefaultValuesArray(model);

		for (int i = 0; i < defaultForms.length; i++) {
			forms.add(new Field((String) defaultForms[i][0], (String) defaultForms[i][1], (String) defaultForms[i][2],
					(Boolean) defaultForms[i][3]));
		}
		return forms;
	}

	public static Set<String> getMandatoryIds(Model model) {
		List<Object[]> defaultProductArray = Arrays.asList(ProductUtils.getDefaultValuesArray(model));
		return defaultProductArray.stream().map(field -> (String) field[0]).collect(Collectors.toSet());
	}

	public static String getOrGenerateId(String labelText, String id, ArrayList<String> ids) {
		if (id == null || id.trim().equalsIgnoreCase("")) {
			String candidate = CaseUtils.toCamelCase(labelText, false);
			if(ids.contains(candidate)) return getOrGenerateId(labelText + String.valueOf(new Random().nextInt(10)), id, ids);
			else {
				ids.add(candidate);
				return candidate;
			}
		}
		return id;
	}

//	public static String generateId(String labelText) {
//		return getOrGenerateId(labelText, null, new ArrayList<String>());
//	}

	public static String toSlug(String input) {

		// Find a better slugify-algo

		final Pattern NONLATIN = Pattern.compile("[^\\w-]");
		final Pattern WHITESPACE = Pattern.compile("[\\s]");

		String nowhitespace = WHITESPACE.matcher(input).replaceAll("-");
		String normalized = Normalizer.normalize(nowhitespace, Form.NFD);
		String slug = NONLATIN.matcher(normalized).replaceAll("");
		return slug.toLowerCase(Locale.ENGLISH);
	}

	public static Model getOptions(String category) {
//		Boolean option;
//		if (category.equals("options"))
//			option = true;
//		else if (category.equals("products"))
//			option = false;
//		else
//			throw new ProductNotFoundException("Wrong Category");
//		return option;
		switch(category) {
			case "options":
				return Model.OPTION;
			case "products":
				return Model.PRODUCT;
			case "sales":
				return Model.SALE;
			default:
				throw new ProductNotFoundException("Wrong Category");
		}
	}

	public static List<Datatype> getDefaultDatatype() {
		List<Datatype> defaultTypes = Arrays.asList(new Datatype("number", "Number"), new Datatype("text", "Text"),
				new Datatype("boolean", "Boolean"), new Datatype("email", "Email"));
		return defaultTypes;
	}

}
