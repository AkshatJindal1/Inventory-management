package org.inventorymanagement.product.exceptionhandler.Exceptions;

public class ProductNotFoundException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public ProductNotFoundException(String message) {
		super(message);
	}

	public ProductNotFoundException() {
		super("Product Not Found");
	}
}
