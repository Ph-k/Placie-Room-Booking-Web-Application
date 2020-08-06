package com.example.demo.exception;

public class AvailabilityNotFoundException extends RuntimeException {

    public AvailabilityNotFoundException(Long id) {

        super("Could not find Availability with id: " + id);
    }

}
