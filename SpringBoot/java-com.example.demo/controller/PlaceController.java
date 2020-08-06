package com.example.demo.controller;

import com.example.demo.exception.PlaceNotFoundException;
import com.example.demo.model.Place;
import com.example.demo.repository.PlaceRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PlaceController {
    private final PlaceRepository repository;

    PlaceController(PlaceRepository repository) {
        this.repository = repository;
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/Places")
    List<Place> all() {
        return repository.findAll();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/Places")
    Place newPlace(@RequestBody Place newPlace) {
        return repository.save(newPlace);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/Places/{id}")
    Place one(@PathVariable Long id ){
        return repository.findById(id).orElseThrow(()->new PlaceNotFoundException(id));
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/PlacesBy/{HostId}")
    List<Place> PlacesByHost(@PathVariable Long HostId) {
        return repository.PlacesByHost(HostId);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/PlacesIn/{region}")
    List<Place> PlacesByRegion(@PathVariable String region) {
        return repository.PlacesByRegion(region);
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/Places/{id}")
    Place replacePlace(@RequestBody Place newPlace, @PathVariable Long id) {
        return repository.findById(id).map(Place -> {
            Place.setHostId(newPlace.getHostId());
            Place.setMainPhotoUrl(newPlace.getMainPhotoUrl());
            Place.setCountry(newPlace.getCountry());
            Place.setCity(newPlace.getCity());
            Place.setDistrict(newPlace.getDistrict());
            Place.setAddress(newPlace.getAddress());
            Place.setOpenStreetMapUrl(newPlace.getOpenStreetMapUrl());
            Place.setTransportation(newPlace.getTransportation());
            Place.setDescription(newPlace.getDescription());
            Place.setType(newPlace.getType());
            Place.setMinCost(newPlace.getMinCost());
            Place.setAdditionalCostPerPerson(newPlace.getAdditionalCostPerPerson());
            Place.setMaxCapacity(newPlace.getMaxCapacity());
            Place.setNumberOfBeds(newPlace.getNumberOfBeds());
            Place.setNumberOfSleepingRooms(newPlace.getNumberOfSleepingRooms());
            Place.setMinimumRentingDates(newPlace.getMinimumRentingDates());
            Place.setLivingRoom(newPlace.getLivingRoom());
            Place.setWiFi(newPlace.getWiFi());
            Place.setAirConditioning(newPlace.getAirConditioning());
            Place.setHeating(newPlace.getHeating());
            Place.setParking(newPlace.getParking());
            Place.setElevator(newPlace.getElevator());
            Place.setPetsAllowed(newPlace.getPetsAllowed());
            Place.setPartiesAllowed(newPlace.getPartiesAllowed());
            Place.setSmokingAllowed(newPlace.getSmokingAllowed());
            return repository.save(newPlace);
        }).orElseThrow(()-> new PlaceNotFoundException(id));
    }
}
