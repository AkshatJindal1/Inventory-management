package org.inventorymanagement.product.utils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.inventorymanagement.product.exceptionhandler.ProductNotFoundException;
import org.inventorymanagement.product.model.DefaultTemplates;
import org.inventorymanagement.product.model.Field;
import org.inventorymanagement.product.model.Form;
import org.inventorymanagement.product.model.Model;

public class DefaultTemplatesUtil {

	private static List<List<Object>> getDefaultOptionValuesArray() {
		List<List<Object>> defaultForms = Arrays.asList(Arrays.asList("optionName", "Option Name", "text", true));
		return defaultForms;
	}

	private static List<List<Object>> getDefaultProductValuesArray() {
		List<List<Object>> defaultForms = Arrays.asList(
				Arrays.asList("productId", "Product Id", "text", true),
				Arrays.asList("productName", "Product Name", "text", true),
				Arrays.asList("description", "Description", "text", false),
				Arrays.asList("image", "Image", "text", false), 
				Arrays.asList("cost", "Cost", "number", false),
				Arrays.asList("quantityInStock", "Quantity in Stock", "number", false),
				Arrays.asList("quantityInTransit", "Quantity in Transit", "number", false),
				Arrays.asList("benchmark", "Benchmark", "number", false));
		return defaultForms;
	}

	private static Form getForm(String client, String name, Model model, List<List<Object>> formSchemas) {
		ArrayList<Field> fields = new ArrayList<>();

		List<List<Object>> defaultForms;
		switch (model) {
		case PRODUCT:
			defaultForms = getDefaultProductValuesArray();
			break;
		case OPTION:
			defaultForms = getDefaultOptionValuesArray();
			break;
		default:
			throw new ProductNotFoundException("Model Type is Incorrect");
		}

		if (formSchemas != null)
			defaultForms.addAll(formSchemas);

		for (int i = 0; i < defaultForms.size(); i++) {
			fields.add(new Field((String) defaultForms.get(i).get(0), (String) defaultForms.get(i).get(1),
					(String) defaultForms.get(i).get(2), (Boolean) defaultForms.get(i).get(3)));
		}

		// Assign Values
		Form form = new Form();
		form.setName(name);
		form.setNameClient(ProductUtils.getNameClient(name, client));
		form.setClient(client);
		form.setFields(fields);
		form.setModel(model);
		form.setUrl(ProductUtils.toSlug(name));
		return form;
	}

	public static Object[][] getTextileSchemas() {
		Object[][] formSchemas = { 
				{ "T Shirts", Model.PRODUCT, null }, 
				{ "Jeans", Model.PRODUCT, null },
				{ "Shirts", Model.PRODUCT, null }, 
				{ "Sizes", Model.OPTION, null }, 
				{ "Material", Model.OPTION, null },
				{ "Type", Model.OPTION, null } };
		return formSchemas;
	}

	public static List<Form> getDefaultTextileForms(String client, DefaultTemplates template) {
		List<Form> forms = new ArrayList<>();
		
		Object[][] formSchemas;
		switch (template) {
		case TEXTILE:
			formSchemas = getTextileSchemas();
			break;
		default:
			formSchemas = new Object[0][0];
			break;
		}
		
		for (int i = 0; i < formSchemas.length; i++) {
			forms.add(getForm(client, (String) formSchemas[i][0], (Model) formSchemas[i][1],
					(List<List<Object>>) formSchemas[i][2]));
		}
		return forms;
	}

}
