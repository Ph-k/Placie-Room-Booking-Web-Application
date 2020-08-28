package com.example.demo.controller;

import com.example.demo.exception.AvailabilityNotFoundException;
import com.example.demo.model.Availability;
import com.example.demo.model.Place;
import com.example.demo.model.User;
import com.example.demo.repository.AvailabilityRepository;
import com.example.demo.repository.PlaceRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
public class AvailabilityController {
    private final AvailabilityRepository repository;
    private final PlaceRepository placeRepository;
    private final UserRepository userRepository;

    AvailabilityController(AvailabilityRepository repository,PlaceRepository placeRepository,UserRepository userRepository) {
        this.repository = repository;
        this.placeRepository = placeRepository;
        this.userRepository = userRepository;
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/Availabilities")
    List<Availability> all() {
        return repository.findAll();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/Availabilities")
    Availability newAvailability(@RequestBody Availability newAvailability, Principal principal) {
        if(this.checkHost(newAvailability,principal))return repository.save(newAvailability);
        else return null;
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/Availabilities/{id}")
    Availability one(@PathVariable Long id ){
        return repository.findById(id).orElseThrow(() -> new AvailabilityNotFoundException(id));
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/Availabilities/{id}")
    void deleteAvailability(@PathVariable Long id,Principal principal) {
        Availability availability = repository.findById(id).orElse( null);
        if(availability == null)return;
        if( this.checkHost(availability,principal))repository.deleteById(id);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/AvailabilitiesFor/{id}")
    List<Availability> getPlaceAvailability(@PathVariable Long id ){
        return repository.getPlaceAvailability(id);
    }

    Boolean checkHost(Availability availability,Principal principal){
        User loggedIn = userRepository.findByUsername(principal.getName());
        Place place = placeRepository.findById(availability.getPlaceId()).orElse(null);

        if(place == null){
            return false;
        }

        User host = userRepository.findById(place.getHostId()).orElse(null);

        if(host == null){
            return false;
        }

        return (loggedIn.getUserId() == host.getUserId());
    }
}
