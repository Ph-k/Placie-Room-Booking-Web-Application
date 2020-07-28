package com.example.demo.exception;

public class PlaceNotFoundException extends RuntimeException {

    public PlaceNotFoundException(Long id) {

        super("Could not find a Place with id: " + id);
    }

}
