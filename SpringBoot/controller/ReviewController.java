package com.example.demo.controller;

import com.example.demo.exception.ReviewNotFoundException;
import com.example.demo.model.Review;
import com.example.demo.repository.ReviewRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class ReviewController {
    private final ReviewRepository repository;

    ReviewController(ReviewRepository repository) {
        this.repository = repository;
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/Reviews")
    List<Review> all() {
        return repository.findAll();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/Reviews")
    Review newReview(@RequestBody Review newReview) {
        return repository.save(newReview);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/Reviews/{id}")
    Review one(@PathVariable Long id ){
        return repository.findById(id).orElseThrow(()-> new ReviewNotFoundException(id));
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/ReviewsFor/{id}")
    List<Review> ReviewsForPlace(@PathVariable Long id) { return repository.ReviewsForPlace(id);}
}
