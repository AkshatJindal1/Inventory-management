package org.inventorymanagement.product.exceptionhandler.Exceptions;

public class ProductIdMismatchException extends RuntimeException {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public ProductIdMismatchException(String message) {
        super(message);
    }
}
