package com.example.demo.controller;

import com.example.demo.exception.ReservationNotFoundException;
import com.example.demo.model.Reservation;
import com.example.demo.repository.ReservationRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.sql.Date;
import java.util.List;

@RestController
public class ReservationController {
    private final ReservationRepository repository;
    private final UserRepository userRepository;


    ReservationController(ReservationRepository repository, UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/Reservations")
    List<Reservation> all() {
        return repository.findAll();
    }

    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyRole('TENANT')")
    @PostMapping("/Reservations")
    boolean newReservation(@RequestBody Reservation newReservation, Principal principal) {

        if(newReservation.getUserId().compareTo(userRepository.findByUsername(principal.getName()).getUserId()) !=0){
            return false;
        }
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
