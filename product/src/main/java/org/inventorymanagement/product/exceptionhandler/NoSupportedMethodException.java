package org.inventorymanagement.product.exceptionhandler;

public class NoSupportedMethodException  extends RuntimeException {

  private static final long serialVersionUID = 1L;

  public NoSupportedMethodException(String message){
    super(message);
  }
}
