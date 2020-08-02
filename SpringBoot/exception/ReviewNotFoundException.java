package com.example.demo.exception;

public class ReviewNotFoundException extends RuntimeException {

    public ReviewNotFoundException(Long id) {
        super("Could not find a review with id: " + id);
    }

}
