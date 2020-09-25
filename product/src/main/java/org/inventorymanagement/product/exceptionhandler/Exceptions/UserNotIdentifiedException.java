package org.inventorymanagement.product.exceptionhandler.Exceptions;

public class UserNotIdentifiedException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public UserNotIdentifiedException(String message) {
		super(message);
	}
	
	public UserNotIdentifiedException() {
		super("User not identified");
	}

}
