package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
class UserController {

    private final UserRepository repository;

    UserController(UserRepository repository) {
        this.repository = repository;
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/Users")
    List<User> all() {
        return repository.findAll();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/Users")
    User newUser(@RequestBody User newUser) {
        return repository.save(newUser);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/Users/{id}")
    Optional<User> one(@PathVariable Long id ){
        return repository.findById(id);
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/Users/{id}")
    Optional<User> replaceUser(@RequestBody User newUser,@PathVariable Long id){
        return repository.findById(id).map(User -> {
            User.setEMail(newUser.getEMail());
            User.setFirstName(newUser.getFirstName());
            User.setLastName(newUser.getLastName());
            User.setUserName(newUser.getUserName());
            User.setPassword(newUser.getPassword());
            User.setTelephone(newUser.getTelephone());
            User.setPhotoUrl(newUser.getPhotoUrl());
            User.setIsTenant(newUser.getIsTenant());
            User.setIsHost(newUser.getIsHost());
            User.setIsAdmin(newUser.getIsAdmin());
            return repository.save(newUser);
        });
    }

}
