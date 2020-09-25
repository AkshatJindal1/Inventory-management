package org.inventorymanagement.product.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.inventorymanagement.product.exceptionhandler.Exceptions.FormNameNullException;
import org.inventorymanagement.product.exceptionhandler.Exceptions.FormNotFoundException;
import org.inventorymanagement.product.exceptionhandler.Exceptions.OptionNotFoundException;
import org.inventorymanagement.product.exceptionhandler.Exceptions.RequiredFieldsMissingException;
import org.inventorymanagement.product.model.Datatype;
import org.inventorymanagement.product.model.Field;
import org.inventorymanagement.product.model.Form;
import org.inventorymanagement.product.model.FormShort;
import org.inventorymanagement.product.model.Model;
import org.inventorymanagement.product.repository.FormRepository;
import org.inventorymanagement.product.repository.OptionRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.util.Pair;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
public class FormServiceTest {

	@Mock
	private FormRepository repository;

	@Mock
	private OptionRepository optionRepository;

	@InjectMocks
	private FormService formService;

	@Test
	public void getDefaultForms1() {

		// Category is Options, size should be 1

		List<Field> var = formService.getDefaultForms("options");
		assertEquals(var.size(), 1);
	}

	@Test
	public void getDefaultForms2() {

		// Category is Products, size should be 7

		List<Field> var = formService.getDefaultForms("products");
		assertEquals(var.size(), 7);
	}

	@Test
	public void getDefaultForms3() {

		// Category is invalid

		assertThrows(OptionNotFoundException.class, () -> formService.getDefaultForms("wrong"));
	}

	@Test
	public void saveForm1() {

		// Form Name is null or empty

		List<Field> fields = new ArrayList<Field>();
		Field f1 = new Field();
		f1.setId("id1");

		assertThrows(FormNameNullException.class, () -> formService.saveForm(fields, "", "", "products", "clientName"));
		assertThrows(FormNameNullException.class,
				() -> formService.saveForm(fields, null, "", "products", "clientName"));

	}

	@Test
	public void saveForm2() {

		// New Form with Required Fields missing

		Mockito.when(repository.findById(Mockito.anyString())).thenReturn(Optional.empty());
		assertThrows(RequiredFieldsMissingException.class,
				() -> formService.saveForm(new ArrayList<>(), "formName", "formId", "products", "clientName"));

	}

	@Test
	public void saveForm3() {

		// New Form with Required Fields missing

		List<Field> fields = getFields();

		Mockito.when(repository.findById(Mockito.anyString())).thenReturn(Optional.empty());
		assertThrows(RequiredFieldsMissingException.class,
				() -> formService.saveForm(fields, "formName", "formId", "products", "clientName"));

	}

	@Test
	public void saveForm4() throws JsonMappingException, JsonProcessingException {

		// Saving New Form

		List<Field> fields = getDefaultFields();
		Form form = new Form();
		String name = "formName";
		String slugName = "formname";
		String client = "clientName";

		form.setClient(client);
		form.setFields(fields);
		form.setModel(Model.OPTION);
		form.setName(name);

		Mockito.when(repository.findById(Mockito.anyString())).thenReturn(Optional.empty());
		Mockito.when(repository.existsByUrlAndClient(Mockito.anyString(), Mockito.anyString())).thenReturn(false);
		Mockito.when(repository.save(Mockito.any(Form.class))).thenAnswer(i -> i.getArguments()[0]);

		Form newForm = formService.saveForm(fields, name, "", "options", client);
		assertEquals(newForm.getClient(), form.getClient());
		assertEquals(newForm.getFields(), form.getFields());
		assertEquals(newForm.getName(), form.getName());
		assertEquals(newForm.getModel(), form.getModel());
		assertEquals(true, newForm.getUrl().matches(slugName + "-\\d+"));

	}

	@Test
	public void saveForm5() throws JsonMappingException, JsonProcessingException {

		// Wrong Id Provided

		List<Field> fields = getDefaultFields();
		Form form = new Form();
		String name = "formName";
		String client = "clientName";

		form.setClient(client);
		form.setFields(fields);
		form.setModel(Model.OPTION);
		form.setName(name);

		Mockito.when(repository.findById(Mockito.anyString())).thenReturn(Optional.empty());
		Mockito.when(repository.existsByUrlAndClient(Mockito.anyString(), Mockito.anyString())).thenReturn(false);
		Mockito.when(repository.save(Mockito.any(Form.class))).thenAnswer(i -> i.getArguments()[0]);

		assertThrows(FormNotFoundException.class, () -> formService.saveForm(fields, name, "12", "options", client));

	}

	@Test
	public void saveForm6() throws JsonMappingException, JsonProcessingException {

		// Updating a form

		List<Field> fields = getDefaultFields();
		Form form = new Form();
		String name = "formName";
		String slugName = "formname";
		String client = "clientName";
		String id = "12";
		form.set_id(id);
		form.setClient(client);
		form.setFields(fields);
		form.setModel(Model.OPTION);
		form.setName(name);

		Mockito.when(repository.findById(Mockito.anyString())).thenReturn(Optional.of(form));
		Mockito.when(repository.existsByUrlAndClient(Mockito.anyString(), Mockito.anyString())).thenReturn(false);
		Mockito.when(repository.save(Mockito.any(Form.class))).thenAnswer(i -> i.getArguments()[0]);

		Form newForm = formService.saveForm(fields, name, id, "options", client);
		assertEquals(newForm.getClient(), form.getClient());
		assertEquals(newForm.getFields(), form.getFields());
		assertEquals(newForm.getName(), form.getName());
		assertEquals(newForm.getModel(), form.getModel());
		assertEquals(true, newForm.getUrl().matches(slugName + "-\\d+"));

	}

	@Test
	public void getByUrl1() {

		// Form Not Found

		Mockito.when(repository.findByUrlAndModelAndClient(Mockito.anyString(), Mockito.any(Model.class),
				Mockito.anyString())).thenReturn(null);

		assertThrows(FormNotFoundException.class, () -> formService.getByUrl("", "products", "client"));

	}

	@Test
	public void getByUrl2() {

		// Form found

		Form form = new Form();
		form.setFields(getFields());

		Mockito.when(repository.findByUrlAndModelAndClient(Mockito.anyString(), Mockito.any(Model.class),
				Mockito.anyString())).thenReturn(form);
		Mockito.when(optionRepository.findByFormId(Mockito.anyString())).thenReturn(new ArrayList<Datatype>());

		Form newForm = formService.getByUrl("", "options", "client");
		assertEquals(newForm.getFields().get(0).getMenuitems().getClass(), ArrayList.class);

	}

	@Test
	public void getAllDatatypes() {

		// Verify all default types are laoded

		Mockito.when(repository.getDatatypes(Mockito.anyString())).thenReturn(new ArrayList<Datatype>());

		Pair<List<Datatype>, List<Datatype>> datatypes = formService.getAllDatatypes("client");
		assertEquals(datatypes.getFirst().size(), 0);
		assertEquals(datatypes.getSecond().size(), 5);

	}
	
	@Test
	public void getAllFormShorts() {

		// Verify all default types are laoded

		ArrayList<FormShort> formShorts = new ArrayList<FormShort>();
		FormShort formShort1 = new FormShort("_id", "url", "name", Model.PRODUCT);
		FormShort formShort2 = new FormShort("_id", "url", "name", Model.PRODUCT);
		FormShort formShort3 = new FormShort("_id", "url", "name", Model.OPTION);
		formShorts.add(formShort1);
		formShorts.add(formShort2);
		formShorts.add(formShort3);
		Mockito.when(repository.getFormShorts(Mockito.anyString())).thenReturn(formShorts);

		HashMap<Model, List<FormShort>> forms = formService.getAllFormShorts("client");
		assertEquals(forms.get(Model.PRODUCT).size(), 2);
		assertEquals(forms.get(Model.OPTION).size(), 1);
		assertEquals(forms.get(Model.SALE).size(), 0);

	}

	private List<Field> getDefaultFields() throws JsonMappingException, JsonProcessingException {
		List<Field> fields = new ArrayList<Field>();

		ObjectMapper mapper = new ObjectMapper();
		Field field = mapper.readValue("{\n" + "        \"id\": \"name\",\n"
				+ "        \"labelText\": \"Option Name\",\n" + "        \"datatype\": \"text\",\n"
				+ "        \"disabled\": true,\n" + "        \"required\": true,\n" + "        \"conditions\": {\n"
				+ "            \"min\": null,\n" + "            \"max\": null,\n" + "            \"errorText\": null\n"
				+ "        },\n" + "        \"menuitems\": null\n" + "    }", Field.class);
		fields.add(field);
		return fields;
	}

	private List<Field> getFields() {
		List<Field> fields = new ArrayList<Field>();
		Field f1 = new Field();
		f1.setId("id1");
		Field f2 = new Field();
		f2.setId("id1");
		fields.add(f1);
		fields.add(f2);
		return fields;
	}

}
