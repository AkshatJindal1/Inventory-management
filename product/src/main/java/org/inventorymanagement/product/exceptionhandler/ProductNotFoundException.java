package org.inventorymanagement.product.exceptionhandler;

public class ProductNotFoundException extends RuntimeException {

    public ProductNotFoundException(String message){
        super(message);
    }
}
