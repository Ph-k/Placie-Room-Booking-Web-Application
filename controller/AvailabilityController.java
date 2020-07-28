package com.example.demo.controller;

import com.example.demo.exception.AvailabilityNotFoundException;
import com.example.demo.model.Availability;
import com.example.demo.repository.AvailabilityRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AvailabilityController {
    private final AvailabilityRepository repository;

    AvailabilityController(AvailabilityRepository repository) {
        this.repository = repository;
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/Availabilities")
    List<Availability> all() {
        return repository.findAll();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/Availabilities")
    Availability newAvailability(@RequestBody Availability newAvailability) {
        return repository.save(newAvailability);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/Availabilities/{id}")
    Availability one(@PathVariable Long id ){
        return repository.findById(id).orElseThrow(() -> new AvailabilityNotFoundException(id));
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/Availabilities/{id}")
    void deleteAvailability(@PathVariable Long id) { repository.deleteById(id); }

    @CrossOrigin(origins = "*")
    @GetMapping("/AvailabilityFor/{id}")
    List<Availability> getPlaceAvailability(@PathVariable Long id ){
        return repository.getPlaceAvailability(id);
    }
}
