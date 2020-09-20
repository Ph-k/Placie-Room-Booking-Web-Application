package com.example.demo.exception;

public class MessageNotFoundException extends RuntimeException {

    public MessageNotFoundException(Long id) {

        super("Could not find a Message with id: " + id);
    }

}
