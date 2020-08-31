package com.example.demo.controller;

import com.example.demo.exception.ReservationNotFoundException;
import com.example.demo.model.Reservation;
import com.example.demo.repository.ReservationRepository;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@RestController
public class ReservationController {
    private final ReservationRepository repository;

    ReservationController(ReservationRepository repository) {
        this.repository = repository;
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/Reservations")
    List<Reservation> all() {
        return repository.findAll();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/Reservations")
    boolean newReservation(@RequestBody Reservation newReservation) {
        Date CheckIn = newReservation.getStartingDate(),CheckOut=newReservation.getEndingDate();
        Long placeId = newReservation.getPlaceId();

        if( repository.CheckAvailability(CheckIn,CheckOut,placeId) == 0 ) {
            return false;
        }

        repository.save(newReservation);
        return true;
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/Reservations/{id}")
    Reservation one(@PathVariable Long id ){
        return repository.findById(id).orElseThrow(()->new ReservationNotFoundException(id));
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/Reservations/Search/{placeId}/checkIn}/{checkOut}")//1= not available
    Reservation[] CheckReservation(@PathVariable Date checkIn,@PathVariable Date checkOut,@PathVariable Long placeId ){
        return null;
    }

}
