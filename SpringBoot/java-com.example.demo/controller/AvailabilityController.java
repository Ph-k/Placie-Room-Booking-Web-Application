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

    //retruns all availabilities
    @CrossOrigin(origins = "*")
    @GetMapping("/Availabilities")
    List<Availability> all() {
        return repository.findAll();
    }

    //new availability
    @CrossOrigin(origins = "*")
    @PostMapping("/Availabilities")
    Availability newAvailability(@RequestBody Availability newAvailability, Principal principal) {
        //only the host of a place can post availability for it
        if(this.checkHost(newAvailability,principal))return repository.save(newAvailability);
        else return null;
    }

    //returns an availability by id
    @CrossOrigin(origins = "*")
    @GetMapping("/Availabilities/{id}")
    Availability one(@PathVariable Long id ){
        return repository.findById(id).orElseThrow(() -> new AvailabilityNotFoundException(id));
    }

    //deletes an availability by id
    @CrossOrigin(origins = "*")
    @DeleteMapping("/Availabilities/{id}")
    void deleteAvailability(@PathVariable Long id,Principal principal) {
        Availability availability = repository.findById(id).orElse( null);
        if(availability == null)return;
        //only the host of a place can delete availability of it
        if( this.checkHost(availability,principal))repository.deleteById(id);
    }

    //returns availability for a particular place
    @CrossOrigin(origins = "*")
    @GetMapping("/AvailabilitiesFor/{id}")
    List<Availability> getPlaceAvailability(@PathVariable Long id ){
        return repository.getPlaceAvailability(id);
    }

    //used to check if the logged in user is the host of the place related to the availability
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
