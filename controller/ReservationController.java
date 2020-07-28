package com.example.demo.controller;

import com.example.demo.exception.ReservationNotFoundException;
import com.example.demo.model.Reservation;
import com.example.demo.repository.ReservationRepository;
import org.springframework.web.bind.annotation.*;
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
    Reservation newReservation(@RequestBody Reservation newReservation) {
        return repository.save(newReservation);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/Reservations/{id}")
    Reservation one(@PathVariable Long id ){
        return repository.findById(id).orElseThrow(()->new ReservationNotFoundException(id));
    }


}
