package org.inventorymanagement.product.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.inventorymanagement.product.exceptionhandler.Exceptions.ProductIdMismatchException;
import org.inventorymanagement.product.exceptionhandler.Exceptions.RequiredFieldsMissingException;
import org.inventorymanagement.product.model.Customer;
import org.inventorymanagement.product.model.Sale;
import org.inventorymanagement.product.model.SalePerProduct;
import org.inventorymanagement.product.repository.CustomerRepository;
import org.inventorymanagement.product.repository.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class SalesService {

	/*
	 * Change Customer Seq logic, if two people read at same time, then possibility
	 * of collision
	 */

	@Autowired
	private SaleRepository saleRepository;

	@Autowired
	private CustomerRepository customerRepository;

	@Autowired
	private SequenceGeneratorService sequenceGeneratorService;

	public void insertSales(HashMap<String, Object> data, String client) {

		// Check if required data present
		if (!data.containsKey("customer") || !data.containsKey("sale"))
			throw new RequiredFieldsMissingException();

		// Mapper Object
		ObjectMapper mapper = new ObjectMapper();

		// Read data from map
		Object customerData = data.get("customer");
		Object saleData = data.get("sale");

		// Get Seq Number
		long customerSeq = sequenceGeneratorService.generateSequence(Customer.SEQUENCE_NAME);
		long saleSeq = sequenceGeneratorService.generateSequence(Sale.SEQUENCE_NAME);

		// Validate Customer
		Customer customer = mapper.convertValue(customerData, Customer.class);
		if (customer.getName().trim().equals(""))
			customer.setName("No Name - " + String.valueOf(customerSeq));
		if (customer.get_id() == null) {
			customer.set_id(customerSeq);
		}
		customer.setClient(client);

		// Save Sale to DB
		List salePerProducts = mapper.convertValue(saleData, List.class);

		// Verify Sale
		for (int i = 0; i < salePerProducts.size(); i++) {
			SalePerProduct salePerProduct = mapper.convertValue(salePerProducts.get(i), SalePerProduct.class);
			if (!salePerProduct.isValid())
				throw new RequiredFieldsMissingException();
		}

		customerRepository.save(customer);

		Sale sale = new Sale();
		sale.setClient(client);
		sale.setCustomer(customer);
		sale.setSalesDate(new Date());
		sale.setProducts(salePerProducts);
		sale.setSalesId(saleSeq);

		// Save to DB
		saleRepository.save(sale);
	}

	public List<Sale> getSales(String client) {
		return saleRepository.findByClient(client);
	}

}
