package org.inventorymanagement.product.exceptionhandler.Exceptions;

public class UserNotApprovedException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public UserNotApprovedException(String message) {
		super(message);
	}
	
	public UserNotApprovedException() {
		super("User not approved yet");
	}

}
