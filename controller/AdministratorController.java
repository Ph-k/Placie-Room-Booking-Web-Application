package com.example.demo.controller;

import com.example.demo.model.Administrator;
import com.example.demo.repository.AdministratorRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class AdministratorController {
    private final AdministratorRepository repository;

    AdministratorController(AdministratorRepository repository) {
        this.repository = repository;
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/Administrators")
    List<Administrator> all() {
        return repository.findAll();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/Administrators")
    Administrator newAdministrator(@RequestBody Administrator newAdministrator) {
        return repository.save(newAdministrator);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/Administrators/{id}")
    Optional<Administrator> one(@PathVariable Long id ){
        return repository.findById(id);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/Administrators/{id}")
    void deleteAdministrator(@PathVariable Long id) { repository.deleteById(id); }

}
