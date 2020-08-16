package org.inventorymanagement.product.exceptionhandler;

public class ProductIdMismatchException extends RuntimeException {

    public ProductIdMismatchException(String message) {
        super(message);
    }
}
