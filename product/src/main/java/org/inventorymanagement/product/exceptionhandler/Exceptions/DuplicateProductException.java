package org.inventorymanagement.product.exceptionhandler.Exceptions;

public class DuplicateProductException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public DuplicateProductException(String message){
        super(message);
    }

	public DuplicateProductException(){
		super("Option with name already exists");
    }
}
