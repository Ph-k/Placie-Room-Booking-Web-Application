package com.example.demo.controller;

import com.example.demo.exception.ReservationNotFoundException;
import com.example.demo.model.Place;
import com.example.demo.model.Reservation;
import com.example.demo.repository.PlaceRepository;
import com.example.demo.repository.ReservationRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.sql.Date;
import java.util.List;

@RestController
public class ReservationController {
    private final ReservationRepository repository;
    private final UserRepository userRepository;
    private final PlaceRepository placeRepository;


    ReservationController(ReservationRepository repository, UserRepository userRepository,PlaceRepository placeRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
        this.placeRepository = placeRepository;
    }

    //only admin can see all reservations
    @CrossOrigin(origins = "*")
    @GetMapping(value="/Reservations", produces = {MediaType.APPLICATION_JSON_VALUE,MediaType.APPLICATION_XML_VALUE})
    @PreAuthorize("hasAnyRole('ADMIN')")
    List<Reservation> all() {
        return repository.findAll();
    }

    //used for a tenant to post a reservation
    @CrossOrigin(origins = "*")
    @PreAuthorize("hasAnyRole('TENANT')")
    @PostMapping("/Reservations")
    boolean newReservation(@RequestBody Reservation newReservation, Principal principal) {

        //if the logged in user is different than the one related to the reservation retuns false
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

    //used for a tenant to get all their reservations
    @CrossOrigin(origins = "*")
    @GetMapping("/MyReservations")
    List<Reservation> MyReservations(Principal principal) {
        Long Id=  userRepository.findByUsername(principal.getName()).getUserId();
        return repository.MyReservations(Id);
    }


    @CrossOrigin(origins = "*")
    @GetMapping("/Reservations/{id}")
    Reservation one(@PathVariable Long id,Principal principal){
        Reservation reservation = repository.findById(id).orElse(null);
        Long loggedIn = userRepository.findByUsername(principal.getName()).getUserId();

        //if logged in user is not the one who made the reservation or is not the place's host,
        // they don't have access to it
        if(reservation == null || reservation.getUserId().compareTo(loggedIn)!=0 &&
            repository.ReservationHost(id).compareTo(loggedIn)!=0){
            throw new ReservationNotFoundException(id);
        }

        return repository.findById(id).orElseThrow(()->new ReservationNotFoundException(id));
    }

    //used for a host to get all reservations of a place they own
    @CrossOrigin(origins = "*")
    @GetMapping("/ReservationsFor/{PlaceId}")
    Reservation[] ReservationsFor(@PathVariable Long PlaceId,Principal principal){
        Long loggedIn = userRepository.findByUsername(principal.getName()).getUserId();
        Place place = placeRepository.findById(PlaceId).orElse(null);

        if(place == null || place.getHostId().compareTo(loggedIn) !=0){
            return null;
        }

        return repository.ReservationsFor(PlaceId);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/Reservations/Search/{placeId}/checkIn}/{checkOut}")//1= not available
    Reservation[] CheckReservation(@PathVariable Date checkIn,@PathVariable Date checkOut,@PathVariable Long placeId ){
        return null;
    }

}
