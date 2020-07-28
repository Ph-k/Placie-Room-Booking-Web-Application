package com.example.demo.controller;

import com.example.demo.exception.PlacePhotoNotFoundException;
import com.example.demo.model.PlacePhoto;
import com.example.demo.repository.PlacePhotoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class PlacePhotoController {
    private final PlacePhotoRepository repository;

    PlacePhotoController(PlacePhotoRepository repository) {
        this.repository = repository;
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/PlacePhotos")
    List<PlacePhoto> all() {
        return repository.findAll();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/PlacePhotos")
    PlacePhoto newPlacePhoto(@RequestBody PlacePhoto newPlacePhoto) {
        return repository.save(newPlacePhoto);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/PlacePhotos/{id}")
    PlacePhoto one(@PathVariable Long id ){
        return repository.findById(id).orElseThrow(()->new PlacePhotoNotFoundException(id));
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/PlacePhotos/{id}")
    void deletePlacePhoto(@PathVariable Long id) { repository.deleteById(id); }
}
