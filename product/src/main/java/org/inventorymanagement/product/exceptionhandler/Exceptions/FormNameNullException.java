package org.inventorymanagement.product.exceptionhandler.Exceptions;

public class FormNameNullException extends RuntimeException {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public FormNameNullException(String message){
        super(message);
    }
	
	public FormNameNullException(){
		super("Form Name Cannot be null");
    }
}
