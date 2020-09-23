package org.inventorymanagement.product.service;

import java.util.List;

import org.inventorymanagement.product.model.Customer;
import org.inventorymanagement.product.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {
	
	@Autowired
	private CustomerRepository customerRepository;

	public void save(String client, Customer customer) {
		customer.setClient(client);
		customerRepository.save(customer);
	}

	public List<Customer> getCustomers(String client, String searchText) {
		System.out.printf("searching '%s' for '%s'", searchText, client);
		return customerRepository.getBySearchTextAndClient(client, searchText, PageRequest.of(0, 10));
	}
}
