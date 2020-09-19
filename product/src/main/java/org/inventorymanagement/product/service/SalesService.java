package org.inventorymanagement.product.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.inventorymanagement.product.exceptionhandler.ProductIdMismatchException;
import org.inventorymanagement.product.exceptionhandler.ProductNotFoundException;
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

	@Autowired
	private SaleRepository saleRepository;

	@Autowired
	private CustomerRepository customerRepository;

	@Autowired
	private SequenceGeneratorService sequenceGeneratorService;

	public void insertSales(HashMap<String, Object> data, String client) {

		// Check if required data present
		if (!data.containsKey("customer") || !data.containsKey("sale"))
			throw new ProductNotFoundException("Some of reuqired fields are missing");

		// Mapper Object
		ObjectMapper mapper = new ObjectMapper();

		// Read data from map
		Object customerData = data.get("customer");
		Object saleData = data.get("sale");

		// Get Seq Number
		long customerSeq = sequenceGeneratorService.generateSequence(Customer.SEQUENCE_NAME);
		long saleSeq = sequenceGeneratorService.generateSequence(Customer.SEQUENCE_NAME);

		// Save Customer to DB
		Customer customer = mapper.convertValue(customerData, Customer.class);
		if (customer.getName().trim().equals(""))
			customer.setName("No Name - " + String.valueOf(customerSeq));
		customer.setClient(client);
		customerRepository.save(customer);
		

		// Save Sale to DB
		List salePerProducts = mapper.convertValue(saleData, List.class);
		
		// Verify Sale
		for(int i=0;i<salePerProducts.size();i++) {
			SalePerProduct salePerProduct = mapper.convertValue(salePerProducts.get(i), SalePerProduct.class);
			if(!salePerProduct.isValid()) 
				throw new ProductIdMismatchException("Some fields are not valid");
		}
		
		Sale sale = new Sale();
		sale.setClient(client);
		sale.setCustomer(customer);
		sale.setSalesDate(new Date());
		sale.setProducts(salePerProducts);
		sale.setSalesId(saleSeq);
		saleRepository.save(sale);

	}

}
