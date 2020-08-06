package com.example.demo.controller;

import com.example.demo.exception.PendingHostNotFoundException;
import com.example.demo.model.PendingHost;
import com.example.demo.repository.PendingHostRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PendingHostController {
    private final PendingHostRepository repository;

    PendingHostController(PendingHostRepository repository) {
        this.repository = repository;
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/PendingHosts")
    List<PendingHost> all() {
        return repository.findAll();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/PendingHosts")
    PendingHost newPendingHost(@RequestBody PendingHost newPendingHost) {
        return repository.save(newPendingHost);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/PendingHosts/{id}")
    PendingHost one(@PathVariable Long id ){
        return repository.findById(id).orElseThrow(()->new PendingHostNotFoundException(id));
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/PendingHosts/{id}")
    void deletePendingHost(@PathVariable Long id) { repository.deleteById(id); }
}
