package org.inventorymanagement.product.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.List;

import org.inventorymanagement.product.exceptionhandler.Exceptions.OptionNotFoundException;
import org.inventorymanagement.product.model.Field;
import org.inventorymanagement.product.repository.FormRepository;
import org.inventorymanagement.product.repository.OptionRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class FormServiceTest {

	@Mock
	private FormRepository repository;

	@Mock
	private OptionRepository optionRepository;

	@InjectMocks
	private FormService formService;

	@Test
	public void defaultOptionForm() {
		List<Field> var = formService.getDefaultForms("options");
		assertEquals(var.size(), 1);
	}

	@Test
	public void defaultProductForm() {
		List<Field> var = formService.getDefaultForms("products");
		assertEquals(var.size(), 7);
	}

	@Test
	public void optionNotFoundDefaultForm() {
		assertThrows(OptionNotFoundException.class, () -> formService.getDefaultForms("wrong"));
	}

}
