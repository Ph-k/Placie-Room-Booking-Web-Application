package com.example.demo.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import com.example.demo.exception.UserNotFoundException;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
class UserController {

    private final UserRepository repository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    public static String PhotosDirectory = System.getProperty("User.dir") + "/ProfilePhotos";
    
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
        if(repository.findByUsername(newUser.getUserName()) != null ) {
            return null;
        }
        else {
            if(newUser.getIsHost() == true){
                newUser.setIsHost(false);
            }
            return repository.save(newUser);}
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
            User.setPhotoPath(newUser.getPhotoPath());
            User.setIsTenant(newUser.getIsTenant());
            User.setIsHost(newUser.getIsHost());
            User.setIsAdmin(newUser.getIsAdmin());
            return repository.save(newUser);
        }).orElseThrow(() -> new UserNotFoundException(id));
    }

    @GetMapping("/UserId/{Username}")
    Long GetId(@PathVariable String Username ){
        User TUser= repository.findByUsername(Username);//.orElseThrow(() -> new UserNotFoundException(Username));
        if( TUser == null ) return Long.valueOf(-1);
        return TUser.getUserId();

    }

    @Transactional
    @RequestMapping(
            value = ("/Users/Image/{username}"),
            headers = "content-type=multipart/form-data",
            method = RequestMethod.POST)
    public int PostImage(@RequestParam("file") MultipartFile Image, @PathVariable String username) throws IOException {
        User TUser = repository.findByUsername(username);

        if( TUser == null ) return -1;
        if( Image.isEmpty() ) return -2;

        String PhotosDirectory = System.getProperty("user.dir") + "\\images\\";
        String PhotoPath = username + GetImageType(Image);
        Image.transferTo(new File(PhotosDirectory + PhotoPath ) );

        repository.setPhotoPath("\\images\\" + PhotoPath,username);

        return 0;
    }

    private String GetImageType(MultipartFile Image){
        String ImageType = "";
        int Index = Image.getOriginalFilename().length() - 1;

        while ( Image.getOriginalFilename().charAt(Index) != '.' || Index < 0 ){
            ImageType = Image.getOriginalFilename().charAt(Index) + ImageType;
            Index--;
        }
       ImageType = Image.getOriginalFilename().charAt(Index) + ImageType; // '.'

        return ImageType;
    }

    @GetMapping(
            value = "/Users/Image/{username}",
            produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody byte[] GetImage(@PathVariable String username) throws IOException {

        User TUser = repository.findByUsername(username);
        if( TUser == null ) return null;

        if( TUser.getPhotoPath() == null ) {
            Path imagePath = Paths.get(System.getProperty("user.dir") + "\\images\\ApplicationImages\\DefaultUserImage.png");
            return Files.readAllBytes(imagePath);
        }

        Path imagePath = Paths.get(System.getProperty("user.dir") + TUser.getPhotoPath());
        return Files.readAllBytes(imagePath);
    }

}
