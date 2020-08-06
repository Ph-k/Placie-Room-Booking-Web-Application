package com.example.demo.exception;

public class ReservationNotFoundException extends RuntimeException {

    public ReservationNotFoundException(Long id) {

        super("Could not find a Reservation with id: " + id);
    }

}