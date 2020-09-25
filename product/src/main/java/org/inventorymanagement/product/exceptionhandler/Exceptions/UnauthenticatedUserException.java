package org.inventorymanagement.product.exceptionhandler.Exceptions;

public class UnauthenticatedUserException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public UnauthenticatedUserException(String message) {
		super(message);
	}

	public UnauthenticatedUserException() {
		super("User is not authenticated");
	}
}
