package org.inventorymanagement.product.exceptionhandler.Exceptions;

public class OptionNotFoundException extends RuntimeException {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public OptionNotFoundException(String message){
        super(message);
    }
	
	public OptionNotFoundException(){
		super("Option not found");
    }
}
