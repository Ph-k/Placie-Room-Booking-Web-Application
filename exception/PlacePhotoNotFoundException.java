package com.example.demo.exception;

public class PlacePhotoNotFoundException extends RuntimeException {

    public PlacePhotoNotFoundException(Long id) {

        super("Could not find a photo of the place with id: " + id);
    }

}
