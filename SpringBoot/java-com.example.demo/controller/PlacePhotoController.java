package com.example.demo.controller;

import com.example.demo.exception.PlacePhotoNotFoundException;
import com.example.demo.model.Place;
import com.example.demo.model.PlacePhoto;
import com.example.demo.repository.PlacePhotoRepository;
import com.example.demo.repository.PlaceRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.List;

@RestController
public class PlacePhotoController {

    private final PlacePhotoRepository repository;
    private final UserRepository userRepository;
    private final PlaceRepository placeRepository;

    PlacePhotoController(PlacePhotoRepository repository,UserRepository userRepository,PlaceRepository placeRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
        this.placeRepository = placeRepository;
    }

    //returns all place photos
    @CrossOrigin(origins = "*")
    @GetMapping("/PlacePhotos")
    List<PlacePhoto> all() {
        return repository.findAll();
    }

    //post place photo(not used,more advanced function below)
    @CrossOrigin(origins = "*")
    @PostMapping("/PlacePhotos")
    PlacePhoto newPlacePhoto(@RequestBody PlacePhoto newPlacePhoto, Principal principal) {

        //only the owner of a place can post a photo for this place(see ValidUser function below)
        if(!ValidUser(principal,newPlacePhoto.getPlaceId())){
            return null;
        }
        return repository.save(newPlacePhoto);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/PlacePhotos/{id}")
    PlacePhoto one(@PathVariable Long id ){
        return repository.findById(id).orElseThrow(()->new PlacePhotoNotFoundException(id));
    }

    //delete place photo by id
    @CrossOrigin(origins = "*")
    @DeleteMapping("/PlacePhotos/{id}")

    void deletePlacePhoto(@PathVariable Long id,Principal principal) {

        //only the owner of a place can delete a photo of this(see ValidUser function below)
        if(!ValidUser(principal,id)){
            return;
        }
        repository.deleteById(id);
    }

    //Comment Needed***************************************************************************************************
    public static String GetImageType(MultipartFile Image) {
        String ImageType = "";
        int Index = Image.getOriginalFilename().length() - 1;

        while (Image.getOriginalFilename().charAt(Index) != '.' || Index < 0) {
            ImageType = Image.getOriginalFilename().charAt(Index) + ImageType;
            Index--;
        }
        ImageType = Image.getOriginalFilename().charAt(Index) + ImageType; // '.'

        return ImageType;
    }

    //Comment Needed*************************************************************************************************************
    private boolean CheckCreateDirectory(Path path) throws IOException {
        if (Files.exists(path)==false) {
            try {
                Files.createDirectories(path);
                return true;
            } catch (IOException e) {
                throw e;
            }
        }
        return false;
    }

    //post place photo
    @CrossOrigin(origins = "*")
    @Transactional
    @RequestMapping(
            value = ("/Places/Images/{placeId}"),
            headers = "content-type=multipart/form-data",
            method = RequestMethod.POST)
    public int PostImage(@RequestParam("file") MultipartFile Image, @PathVariable Long placeId,Principal principal) throws IOException {
        //only the owner of a place can post a photo for this place(see ValidUser function below)
        if(!ValidUser(principal,placeId)){
            return -1;
        }

        //Place place = PlaceRepository.findById(placeId).orElse(null);

        //if (place == null) return -1;
        if (Image.isEmpty()) return -2;


        String PhotosDirectory = System.getProperty("user.dir") + "\\images\\Places\\" + placeId;

        try{
            CheckCreateDirectory(Paths.get(PhotosDirectory));
        } catch (IOException e) {
            throw e;
        }

        PlacePhoto placephoto = new PlacePhoto();
        placephoto.setPhotoUrl(null);
        placephoto.setPlaceId(placeId);
        repository.save(placephoto);

        String PhotoName = placephoto.getPlacePhotoId() + GetImageType(Image);
        //Files.deleteIfExists(Paths.get(PhotoName));
        Image.transferTo(new File(PhotosDirectory + "\\" + PhotoName));
        repository.setPhotoUrl("\\images\\Places\\" + placeId + "\\" + PhotoName,placephoto.getPlacePhotoId());
        return 0;
    }

    //Comment Needed***********************************************************************************************************************
    @CrossOrigin(origins = "*")
    @GetMapping("/Places/PhotoRange/{placeId}")
    int[] getPhotosIds(@PathVariable Long placeId) {
        return repository.getPhotosId(placeId);
    }

    @GetMapping(
            value = "/Places/Images/{photoId}",
            produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody
    byte[] GetImage(@PathVariable Long photoId) throws IOException {

        PlacePhoto placephoto = repository.findById(photoId).orElse(null);

        if (placephoto == null) return null;

        if (placephoto.getPhotoUrl() == null) {
            Path imagePath = Paths.get(System.getProperty("user.dir") + "\\images\\ApplicationImages\\DefaultPlaceImage.png");
            return Files.readAllBytes(imagePath);
        }

        Path imagePath = Paths.get(System.getProperty("user.dir") + placephoto.getPhotoUrl());
        return Files.readAllBytes(imagePath);
    }

    //Used to examine if the logged in user owns the place they want to upload/delete photos for
    boolean ValidUser(Principal principal,@PathVariable Long id){

        Place place=placeRepository.findById(id).orElse(null);

        if(place == null){
            return false;
        }

        if(userRepository.findByUsername(principal.getName()).getUserId().
                compareTo(place.getHostId())!=0){
            return false;
        }
        else{
            return true;
        }
    }
}
