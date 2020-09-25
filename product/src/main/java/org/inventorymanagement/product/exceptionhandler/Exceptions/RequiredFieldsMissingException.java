package org.inventorymanagement.product.exceptionhandler.Exceptions;

import java.util.Set;

public class RequiredFieldsMissingException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public RequiredFieldsMissingException(String message) {
		super(message);
	}

	public RequiredFieldsMissingException(String type, Set<String> requestIds, Set<String> mandatoryIds) {
		super(type + "\nMandatory Ids: " + requestIds.toString() + "\nRequestedIds: " + mandatoryIds.toString());
	}

	public RequiredFieldsMissingException() {
		super("Some of reuqired fields are missing");
	}
}
