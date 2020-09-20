package com.example.demo.controller;

import com.example.demo.exception.PendingHostNotFoundException;
import com.example.demo.model.PendingHost;
import com.example.demo.repository.PendingHostRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.http.MediaType;
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

    //only admin can see all pending hosts
    @CrossOrigin(origins = "*")
    @GetMapping(value="/PendingHosts", produces = {MediaType.APPLICATION_JSON_VALUE,MediaType.APPLICATION_XML_VALUE})
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

        //only a user can see if themselves are a pending host
        if(pendingHost == null ||
                pendingHost.getUserId().compareTo(userRepository.findByUsername(principal.getName()).getUserId()) !=0
                && !userRepository.findByUsername(principal.getName()).getIsAdmin()){
            throw new PendingHostNotFoundException(id);
        }
        return repository.findById(id).orElseThrow(() -> new PendingHostNotFoundException(id));
    }

    //only admin can delete a pending host when he/she verifies them
    @CrossOrigin(origins = "*")
    @DeleteMapping("/PendingHosts/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    void deletePendingHost(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
