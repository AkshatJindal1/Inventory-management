package org.inventorymanagement.product.service;

import java.util.List;

import org.inventorymanagement.product.model.Customer;
import org.inventorymanagement.product.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {
	
	@Autowired
	private CustomerRepository customerRepository;
	
	public List<Customer> findBySearchText(String searchText, String client) {
		return customerRepository.getBySearchTextAndClient(client, searchText);
	}

	public void save(String client, Customer customer) {
		customer.setClient(client);
		customerRepository.save(customer);
	}
}
