package com.example.demo.controller;

import java.security.Principal;
import java.util.List;
import com.example.demo.exception.MessageNotFoundException;
import com.example.demo.model.Message;
import com.example.demo.repository.MessageRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
class MessageController {

    private final MessageRepository repository;
    private final UserRepository userRepository;

    MessageController(MessageRepository repository,UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    //returns all messages
    @CrossOrigin(origins = "*")
    @GetMapping("/Messages")
    @PreAuthorize("hasAnyRole('ADMIN')")  //only admin has access to all messages
    List<Message> all() {
        return repository.findAll();
    }

    //used to post a message
    @CrossOrigin(origins = "*")
    @PostMapping("/Messages")
    Message newMessage(@RequestBody Message newMessage, Principal principal) {
        //if the logged in is different than the sender,don't post the message
        if(userRepository.findByUsername(principal.getName()).getUserId().compareTo(
                newMessage.getSenderId())!=0
        ){
            return null;
        }
        return repository.save(newMessage);
    }

    //used to return a message by id
    @CrossOrigin(origins = "*")
    @GetMapping("/Messages/{id}")
    Message one(@PathVariable Long id,Principal principal){
        if(!ValidSenderOrReceiver(id,principal)){
            throw new MessageNotFoundException(id);
        }
        return repository.findById(id).orElseThrow(()->new MessageNotFoundException(id));
    }

    //used to delete a message by id
    @CrossOrigin(origins = "*")
    @DeleteMapping("/Messages/{id}")
    void deleteMessage(@PathVariable Long id,Principal principal) {
        if(!ValidSenderOrReceiver(id,principal)){
            throw new MessageNotFoundException(id);
        }
        repository.deleteById(id);
    }

    //used to get all messages a user has sent
    @CrossOrigin(origins = "*")
    @GetMapping("/SentMessages/{SenderId}")
    List<Message> Sent(@PathVariable Long SenderId,Principal principal){
        //only a user can get their own sent messages
        if(!ValidUser(principal,SenderId)){
            return null;
        }
        return repository.getSent(SenderId);
    }

    //used to get all messages a user has received
    @CrossOrigin(origins = "*")
    @GetMapping("/ReceivedMessages/{ReceiverId}")
    List<Message> Received(@PathVariable Long ReceiverId,Principal principal){
        //only a user can get their own received messages
        if(!ValidUser(principal,ReceiverId)){
            return null;
        }
        return repository.getReceived(ReceiverId);
    }

    //used to get all messages a user has received(same as above?)
    @CrossOrigin(origins = "*")
    @GetMapping("/AllMessages/{ReceiverId}")
    List<Message> getAll(@PathVariable Long ReceiverId,Principal principal){
        //only a user can get their own received or sent messages
        if(!ValidUser(principal,ReceiverId)){
            return null;
        }
        return repository.getAll(ReceiverId);
    }

    //used to get all contacted users' names of a user in string format
    @CrossOrigin(origins = "*")
    @GetMapping("/ContactedUsers/{ReceiverId}")
    List<String> getContactedUsers(@PathVariable Long ReceiverId,Principal principal){
        //only a user can get the users in contact with them
        if(!ValidUser(principal,ReceiverId)){
            return null;
        }
        return repository.getContactedUsers(ReceiverId);
    }

    //used to get all messages between two users
    @CrossOrigin(origins = "*")
    @GetMapping("/MessagesBetween/{SenderId}/{ReceiverId}")
    List<Message> getBetween(@PathVariable Long ReceiverId, @PathVariable Long SenderId,Principal principal){
        //only the user with SenderId or with ReceiverId can access it
        if(!ValidUser(principal,ReceiverId) && !ValidUser(principal,SenderId)){
            return null;
        }
        return repository.getBetween(SenderId,ReceiverId);
    }

    //checks if the logged in user is the sender or the receiver of a message
    Boolean ValidSenderOrReceiver(Long MessageId,Principal principal){
        Long LoggedIn = userRepository.findByUsername(principal.getName()).getUserId();
        Message message = repository.findById(MessageId).orElse(null);

        if(message == null)return false;

        Long Sender=message.getSenderId();
        Long Receiver=message.getReceiverId();

        return (LoggedIn.compareTo(Sender) ==0 || LoggedIn.compareTo(Receiver) ==0);

    }

    //checks if the logged in user is the one with the given userId
    Boolean ValidUser(Principal principal,Long userId){
        Long LoggedIn = userRepository.findByUsername(principal.getName()).getUserId();

        return LoggedIn.compareTo(userId)==0;
    }
}
