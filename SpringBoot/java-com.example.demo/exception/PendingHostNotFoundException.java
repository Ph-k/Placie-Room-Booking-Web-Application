package com.example.demo.exception;

public class PendingHostNotFoundException extends RuntimeException {

    public PendingHostNotFoundException(Long id) {

        super("Could not find a Pending Host with id: " + id);
    }

}
