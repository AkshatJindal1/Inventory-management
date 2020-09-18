package org.inventorymanagement.product.service;

import org.inventorymanagement.product.model.Customer;
import org.inventorymanagement.product.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class CustomerService {
	
	@Autowired
	private CustomerRepository customerRepository;
	
	public Customer findByName(String name, String client) {
		return null;
	}

}
