package org.inventorymanagement.product.exceptionhandler;

public class UnauthenticatedUserException extends RuntimeException {

  private static final long serialVersionUID = 1L;

  public UnauthenticatedUserException(String message){
    super(message);
  }
}
