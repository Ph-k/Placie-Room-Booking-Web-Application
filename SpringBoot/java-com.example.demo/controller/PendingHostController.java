package com.example.demo.controller;

import com.example.demo.exception.PendingHostNotFoundException;
import com.example.demo.model.PendingHost;
import com.example.demo.repository.PendingHostRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
public class PendingHostController {
    private final PendingHostRepository repository;
    private final UserRepository userRepository;

    PendingHostController(PendingHostRepository repository , UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/PendingHosts")
    @PreAuthorize("hasAnyRole('ADMIN')")
    List<PendingHost> all() {
        return repository.findAll();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/PendingHosts")
    PendingHost newPendingHost(@RequestBody PendingHost newPendingHost, Principal principal) {
        return repository.save(newPendingHost);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/PendingHosts/{id}")
    PendingHost one(@PathVariable Long id , Principal principal) {
        PendingHost pendingHost = repository.findById(id).orElse(null);

        if(pendingHost == null ||
                pendingHost.getUserId().compareTo(userRepository.findByUsername(principal.getName()).getUserId()) !=0
                && !userRepository.findByUsername(principal.getName()).getIsAdmin()){
            throw new PendingHostNotFoundException(id);
        }
        return repository.findById(id).orElseThrow(() -> new PendingHostNotFoundException(id));
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/PendingHosts/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    void deletePendingHost(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
