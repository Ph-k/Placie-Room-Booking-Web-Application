package com.example.demo.controller;

import com.example.demo.exception.ReviewNotFoundException;
import com.example.demo.model.Reservation;
import com.example.demo.model.Review;
import com.example.demo.repository.ReservationRepository;
import com.example.demo.repository.ReviewRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
public class ReviewController {
    private final ReviewRepository repository;
    private final UserRepository userRepository;
    private final ReservationRepository reservationRepository;

    ReviewController(ReviewRepository repository, UserRepository userRepository, ReservationRepository reservationRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
        this.reservationRepository = reservationRepository;
    }

    //returns all reviews
    @CrossOrigin(origins = "*")
    @GetMapping("/Reviews")
    List<Review> all() {
        return repository.findAll();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/Reviews")
    Review newReview(@RequestBody Review newReview, Principal principal) {
        Reservation reservation = reservationRepository.findById
        (newReview.getReservationId()).orElse(null);

        if(reservation == null || principal == null){
            return null;
        }

        //only one review per reservation is allowed
        if(repository.ReviewsForReservation(newReview.getReservationId())!=null){
            return null;
        }

        //only the user related to the reservation can post a review related to the reservation
        if(userRepository.findByUsername(principal.getName()).getUserId().compareTo
                (reservation.getUserId())!=0){
            return null;
        }

        return repository.save(newReview);
    }

    //returns a particular review
    @CrossOrigin(origins = "*")
    @GetMapping("/Reviews/{id}")
    Review one(@PathVariable Long id ){
        return repository.findById(id).orElseThrow(()-> new ReviewNotFoundException(id));
    }

    //returns reviews of a particular place(given it's id)
    @CrossOrigin(origins = "*")
    @GetMapping("/ReviewsFor/{id}")
    List<Review> ReviewsForPlace(@PathVariable Long id) { return repository.ReviewsForPlace(id);}

    //returns a review related to a reservation
    @CrossOrigin(origins = "*")
    @GetMapping("/ReviewForReservation/{id}")
    Review ReviewForReservation(@PathVariable Long id) {
        return repository.ReviewsForReservation(id);
    }

}
