package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import com.example.demo.exception.UserNotFoundException;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
class UserController {

    private final UserRepository repository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    
    UserController(UserRepository repository,BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.repository = repository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/Users")
    List<User> all() {
        return repository.findAll();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/Registration")
    User newUser(@RequestBody User newUser)
    {   newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
        if(repository.findByUsername(newUser.getUserName()) != null || repository.findByEmail(newUser.getEMail()) !=null) {
            return null;
        }
        else {return repository.save(newUser);}
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/Users/{id}")
    User one(@PathVariable Long id ){
        return repository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/Users/{id}")
    User replaceUser(@RequestBody User newUser,@PathVariable Long id){
        return repository.findById(id).map(User -> {
            User.setEMail(newUser.getEMail());
            User.setFirstName(newUser.getFirstName());
            User.setLastName(newUser.getLastName());
            User.setUserName(newUser.getUserName());
            User.setPassword(newUser.getPassword());
            User.setTelephone(newUser.getTelephone());
            User.setPhotoBytes(newUser.getPhotoBytes());
            User.setIsTenant(newUser.getIsTenant());
            User.setIsHost(newUser.getIsHost());
            User.setIsAdmin(newUser.getIsAdmin());
            return repository.save(newUser);
        }).orElseThrow(() -> new UserNotFoundException(id));
    }

    @PutMapping("/Users/{id}/Image")
    int PostImage(@RequestBody MultipartFile Image, @PathVariable String id) throws Exception{
        byte[] ImageBytes = Image.getBytes();
        System.out.println(ImageBytes);
        //User.setPhotoBytes(Image.getBytes());
        return 0;
    }

}
