package org.inventorymanagement.product.exceptionhandler.Exceptions;

public class FormNotFoundException extends RuntimeException {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public FormNotFoundException(String message){
        super(message);
    }
	
	public FormNotFoundException(){
		super("Form not found");
    }
}
