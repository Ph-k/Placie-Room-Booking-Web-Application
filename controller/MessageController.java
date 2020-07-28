package com.example.demo.controller;

import java.util.List;

import com.example.demo.exception.MessageNotFoundException;
import com.example.demo.model.Message;
import com.example.demo.repository.MessageRepository;
import org.springframework.web.bind.annotation.*;

@RestController
class MessageController {

    private final MessageRepository repository;

    MessageController(MessageRepository repository) {
        this.repository = repository;
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/Messages")
    List<Message> all() {
        return repository.findAll();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/Messages")
    Message newMessage(@RequestBody Message newMessage) {
        return repository.save(newMessage);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/Messages/{id}")
    Message one(@PathVariable Long id ){
        return repository.findById(id).orElseThrow(()->new MessageNotFoundException(id));
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/Messages/{id}")
    void deleteMessage(@PathVariable Long id) { repository.deleteById(id); }

    @CrossOrigin(origins = "*")
    @GetMapping("/SentMessages/{SenderId}")
    List<Message> Sent(@PathVariable Long SenderId ){
        return repository.getSent(SenderId);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/ReceivedMessages/{ReceiverId}")
    List<Message> Received(@PathVariable Long ReceiverId ){
        return repository.getReceived(ReceiverId);
    }

}
