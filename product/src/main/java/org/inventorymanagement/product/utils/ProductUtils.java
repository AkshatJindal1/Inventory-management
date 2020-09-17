package org.inventorymanagement.product.utils;

import java.text.Normalizer;
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
import org.inventorymanagement.product.model.Datatype;
import org.inventorymanagement.product.model.Field;
import org.inventorymanagement.product.model.Form;
import org.inventorymanagement.product.model.Model;

public class ProductUtils {


	private static final String breakpoint = "$$<-->$$";

	public static Object[][] getDefaultOptionValuesArray() {
		Object[][] defaultForms = { { "name", "Option Name", "text", true } };
		return defaultForms;
	}

	public static Object[][] getDefaultProductValuesArray() {
		Object[][] defaultForms = {
				{ "productId", "Product Id", "text", true },
				{ "productName", "Product Name", "text", true },
				{ "description", "Description", "text", false },
				{ "image", "Image", "text", false },
				{ "cost", "Cost", "number", false },
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

	public static String toSlug(String input) {

		// Find a better slugify-algo

		final Pattern NONLATIN = Pattern.compile("[^\\w-]");
		final Pattern WHITESPACE = Pattern.compile("[\\s]");

		String nowhitespace = WHITESPACE.matcher(input).replaceAll("-");
		String normalized = Normalizer.normalize(nowhitespace, java.text.Normalizer.Form.NFD);
		String slug = NONLATIN.matcher(normalized).replaceAll("");
		return slug.toLowerCase(Locale.ENGLISH);
	}

	public static Model getModel(String category) {
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

	public static String getNameClient(String name, String client) {

		return name+breakpoint+client;
	}

	public static Form getSalesForm() {

		Form form = new Form();
		form.setFields(ProductUtils.getDefaultForms(Model.SALE));
		form.setUrl("sales");
		form.setModel(Model.SALE);
		System.out.println(form);
		return form;
	}

}
