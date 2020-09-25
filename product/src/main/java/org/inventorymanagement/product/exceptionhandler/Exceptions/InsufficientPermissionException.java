package org.inventorymanagement.product.exceptionhandler.Exceptions;

public class InsufficientPermissionException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public InsufficientPermissionException(String message) {
		super(message);
	}
	
	public InsufficientPermissionException() {
		super("Insufficient Permissions");
	}

}
