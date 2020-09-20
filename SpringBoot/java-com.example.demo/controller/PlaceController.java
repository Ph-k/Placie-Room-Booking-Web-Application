package com.example.demo.controller;

import com.example.demo.exception.PlaceNotFoundException;
import com.example.demo.model.Place;
import com.example.demo.repository.PlaceRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
import java.sql.Date;
import java.util.List;

@RestController
public class PlaceController {
    private final PlaceRepository repository;
    private final UserRepository userRepository;

    PlaceController(PlaceRepository repository, UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    //returns all places
    @CrossOrigin(origins = "*")
    @GetMapping(value="/Places", produces = {MediaType.APPLICATION_JSON_VALUE,MediaType.APPLICATION_XML_VALUE})
    List<Place> all() {
        return repository.findAll();
    }

    //only a host can post a new place
    @CrossOrigin(origins = "*")
    @PostMapping("/Places")
    @PreAuthorize("hasAnyRole('HOST')")
    Place newPlace(@RequestBody Place newPlace, Principal principal) {
        //the new place has the host_id of the user who posted it(used to avoid a host posting for another host)
        newPlace.setHostId(this.userRepository.findByUsername(principal.getName()).getUserId());
        return repository.save(newPlace);
    }

    //get a place by id
    @CrossOrigin(origins = "*")
    @GetMapping("/Places/{id}")
    Place one(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new PlaceNotFoundException(id));
    }

    //get all places of a particular host
    @CrossOrigin(origins = "*")
    @GetMapping("/PlacesBy/{HostId}")
    List<Place> PlacesByHost(@PathVariable Long HostId) {
        return repository.PlacesByHost(HostId);
    }

    //get all places of a particular region(not used)
    @CrossOrigin(origins = "*")
    @GetMapping("/PlacesIn/{region}")
    List<Place> PlacesByRegion(@PathVariable String region) {
        return repository.PlacesByRegion(region);
    }

    //used to edit details of a place(only a host can do it)
    @CrossOrigin(origins = "*")
    @PutMapping("/Places/{id}")
    @PreAuthorize("hasAnyRole('HOST')")
    Place replacePlace(@RequestBody Place newPlace, @PathVariable Long id,Principal principal) {

        Place place = repository.findById(id).orElse(null);

        if(place == null){
            throw  new PlaceNotFoundException(id);
        }

        //only the host of a place can edit it
        if( place.getHostId() !=
                userRepository.findByUsername(principal.getName()).getUserId()){
            throw new PlaceNotFoundException(id);
        }

        return repository.findById(id).map(Place -> {
            Place.setHostId(newPlace.getHostId());
            Place.setMainPhotoUrl(newPlace.getMainPhotoUrl());
            Place.setCountry(newPlace.getCountry());
            Place.setCity(newPlace.getCity());
            Place.setDistrict(newPlace.getDistrict());
            Place.setAddress(newPlace.getAddress());
            Place.setXCoordinate(newPlace.getXCoordinate());
            Place.setYCoordinate(newPlace.getYCoordinate());
            Place.setTransportation(newPlace.getTransportation());
            Place.setDescription(newPlace.getDescription());
            Place.setType(newPlace.getType());
            Place.setMinCost(newPlace.getMinCost());
            Place.setAdditionalCostPerPerson(newPlace.getAdditionalCostPerPerson());
            Place.setMaxCapacity(newPlace.getMaxCapacity());
            Place.setNumberOfBeds(newPlace.getNumberOfBeds());
            Place.setNumberOfSleepingRooms(newPlace.getNumberOfSleepingRooms());
            Place.setMinimumRentingDates(newPlace.getMinimumRentingDates());
            Place.setLivingRoom(newPlace.getLivingRoom());
            Place.setWiFi(newPlace.getWiFi());
            Place.setAirConditioning(newPlace.getAirConditioning());
            Place.setHeating(newPlace.getHeating());
            Place.setParking(newPlace.getParking());
            Place.setElevator(newPlace.getElevator());
            Place.setPetsAllowed(newPlace.getPetsAllowed());
            Place.setPartiesAllowed(newPlace.getPartiesAllowed());
            Place.setSmokingAllowed(newPlace.getSmokingAllowed());
            Place.setArea(newPlace.getArea());
            return repository.save(newPlace);
        }).orElseThrow(() -> new PlaceNotFoundException(id));
    }

    //delete a place by id
    @CrossOrigin(origins = "*")
    @DeleteMapping("/Places/{id}")
    @PreAuthorize("hasAnyRole('HOST')")
    void deletePlace(@PathVariable Long id , Principal principal) {
        Place place = repository.findById(id).orElse(null);

        if(place == null){
            throw  new PlaceNotFoundException(id);
        }

        if( place.getHostId() !=
                userRepository.findByUsername(principal.getName()).getUserId()){
            throw new PlaceNotFoundException(id);
        }

        repository.deleteById(id);
    }

    @CrossOrigin(origins = "*")
    @Transactional
    @RequestMapping(
            value = ("/Places/MainImage/{placeId}"),
            headers = "content-type=multipart/form-data",
            method = RequestMethod.POST)
    public int PostMainImage(@RequestParam("file") MultipartFile Image, @PathVariable Long placeId) throws IOException {
        /*if (!UserHasRights(repository.findByUsername(username).getUserId(), principal)) {
            throw new IOException();
        }*/

        Place place = repository.findById(placeId).orElse(null);

        if (place == null) return -1;
        if (Image.isEmpty()) return -2;

        String PhotosDirectory = System.getProperty("user.dir") + "\\images\\Places\\";

        try{
            PlacePhotoController.CheckCreateDirectory(Paths.get(PhotosDirectory));
        } catch (IOException e) {
            throw e;
        }

        String PhotoName = placeId.toString() + PlacePhotoController.GetImageType(Image);

        Files.deleteIfExists(Paths.get(PhotoName));
        Image.transferTo(new File(PhotosDirectory + PhotoName));

        repository.setMainPhotoUrl("\\images\\Places\\" + PhotoName, placeId);

        return 0;
    }

    @GetMapping(
            value = "/Places/MainImage/{placeId}",
            produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody
    byte[] GetMainImage(@PathVariable Long placeId) throws IOException {

        Place place = repository.findById(placeId).orElse(null);
        if (place == null) return null;

        if (place.getMainPhotoUrl() == null) {
            Path imagePath = Paths.get(System.getProperty("user.dir") + "\\images\\ApplicationImages\\DefaultPlaceImage.png");
            return Files.readAllBytes(imagePath);
        }

        Path imagePath = Paths.get(System.getProperty("user.dir") + place.getMainPhotoUrl());
        return Files.readAllBytes(imagePath);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/PlacesSearch/{checkIn}/{checkOut}/{country}/{city}/{district}/{persons}")
    List<Place> Search(@PathVariable Date checkIn, @PathVariable Date checkOut, @PathVariable String country, @PathVariable String city, @PathVariable String district, @PathVariable Long persons) {
        if(country.equals("null") ) country = "%";
        if(city.equals("null") ) city = "%";
        if(district.equals("null") ) district = "%";

        return repository.Search(checkIn,checkOut,country,city,district,persons);
    }

}
