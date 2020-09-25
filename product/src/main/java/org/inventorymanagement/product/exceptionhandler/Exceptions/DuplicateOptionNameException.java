package org.inventorymanagement.product.exceptionhandler.Exceptions;

public class DuplicateOptionNameException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public DuplicateOptionNameException(String message){
        super(message);
    }

	public DuplicateOptionNameException(){
		super("Option with name already exists");
    }
}
