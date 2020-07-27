package com.example.demo.model;

import com.sun.istack.NotNull;
import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


@Data
@Entity
public class Place{
    private @Id @GeneratedValue Long PlaceId;

    @NotNull
    private Long HostId;

    private String MainPhotoUrl;

    @NotNull
    private String Region;

    @NotNull
    private String Address;

    @NotNull
    private String OpenStreetMapUrl;

    private String Transportation;

    private String Description;

    private String Type;

    @NotNull
    private Float MinCost;

    private Float AdditionalCostPerPerson;

    private Integer MaxCapacity;

    private Integer NumberOfBeds;

    private Integer NumberOfSleepingRooms;

    private Integer MinimumRentingDates;

    private Boolean LivingRoom;

    private Boolean WiFi;

    private Boolean AirConditioning;

    private Boolean Heating;

    private Boolean Parking;

    private Boolean Elevator;

    private Boolean PetsAllowed;

    private Boolean PartiesAllowed;

    private Boolean SmokingAllowed;

    public Place(){}

    public Place(Long placeId, Long hostId, String mainPhotoUrl, String region, String address,
                 String openStreetMapUrl, String transportation, String description, String type, Float minCost,
                 Float additionalCostPerPerson, Integer maxCapacity, Integer numberOfBeds,
                 Integer numberOfSleepingRooms, Integer minimumRentingDates, Boolean livingRoom, Boolean wiFi,
                 Boolean airConditioning, Boolean heating, Boolean parking, Boolean elevator, Boolean petsAllowed,
                 Boolean partiesAllowed, Boolean smokingAllowed) {
        PlaceId = placeId;
        HostId = hostId;
        MainPhotoUrl = mainPhotoUrl;
        Region = region;
        Address = address;
        OpenStreetMapUrl = openStreetMapUrl;
        Transportation = transportation;
        Description = description;
        Type = type;
        MinCost = minCost;
        AdditionalCostPerPerson = additionalCostPerPerson;
        MaxCapacity = maxCapacity;
        NumberOfBeds = numberOfBeds;
        NumberOfSleepingRooms = numberOfSleepingRooms;
        MinimumRentingDates = minimumRentingDates;
        LivingRoom = livingRoom;
        WiFi = wiFi;
        AirConditioning = airConditioning;
        Heating = heating;
        Parking = parking;
        Elevator = elevator;
        PetsAllowed = petsAllowed;
        PartiesAllowed = partiesAllowed;
        SmokingAllowed = smokingAllowed;
    }

    public Long getPlaceId() {
        return PlaceId;
    }

    public void setPlaceId(Long placeId) {
        PlaceId = placeId;
    }

    public Long getHostId() {
        return HostId;
    }

    public void setHostId(Long hostId) {
        HostId = hostId;
    }

    public String getMainPhotoUrl() {
        return MainPhotoUrl;
    }

    public void setMainPhotoUrl(String mainPhotoUrl) {
        MainPhotoUrl = mainPhotoUrl;
    }

    public String getRegion() {
        return Region;
    }

    public void setRegion(String region) {
        Region = region;
    }

    public String getAddress() {
        return Address;
    }

    public void setAddress(String address) {
        Address = address;
    }

    public String getOpenStreetMapUrl() {
        return OpenStreetMapUrl;
    }

    public void setOpenStreetMapUrl(String openStreetMapUrl) {
        OpenStreetMapUrl = openStreetMapUrl;
    }

    public String getTransportation() {
        return Transportation;
    }

    public void setTransportation(String transportation) {
        Transportation = transportation;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }

    public String getType() {
        return Type;
    }

    public void setType(String type) {
        Type = type;
    }

    public Float getMinCost() {
        return MinCost;
    }

    public void setMinCost(Float minCost) {
        MinCost = minCost;
    }

    public Float getAdditionalCostPerPerson() {
        return AdditionalCostPerPerson;
    }

    public void setAdditionalCostPerPerson(Float additionalCostPerPerson) {
        AdditionalCostPerPerson = additionalCostPerPerson;
    }

    public Integer getMaxCapacity() {
        return MaxCapacity;
    }

    public void setMaxCapacity(Integer maxCapacity) {
        MaxCapacity = maxCapacity;
    }

    public Integer getNumberOfBeds() {
        return NumberOfBeds;
    }

    public void setNumberOfBeds(Integer numberOfBeds) {
        NumberOfBeds = numberOfBeds;
    }

    public Integer getNumberOfSleepingRooms() {
        return NumberOfSleepingRooms;
    }

    public void setNumberOfSleepingRooms(Integer numberOfSleepingRooms) {
        NumberOfSleepingRooms = numberOfSleepingRooms;
    }

    public Integer getMinimumRentingDates() {
        return MinimumRentingDates;
    }

    public void setMinimumRentingDates(Integer minimumRentingDates) {
        MinimumRentingDates = minimumRentingDates;
    }

    public Boolean getLivingRoom() {
        return LivingRoom;
    }

    public void setLivingRoom(Boolean livingRoom) {
        LivingRoom = livingRoom;
    }

    public Boolean getWiFi() {
        return WiFi;
    }

    public void setWiFi(Boolean wiFi) {
        WiFi = wiFi;
    }

    public Boolean getAirConditioning() {
        return AirConditioning;
    }

    public void setAirConditioning(Boolean airConditioning) {
        AirConditioning = airConditioning;
    }

    public Boolean getHeating() {
        return Heating;
    }

    public void setHeating(Boolean heating) {
        Heating = heating;
    }

    public Boolean getParking() {
        return Parking;
    }

    public void setParking(Boolean parking) {
        Parking = parking;
    }

    public Boolean getElevator() {
        return Elevator;
    }

    public void setElevator(Boolean elevator) {
        Elevator = elevator;
    }

    public Boolean getPetsAllowed() {
        return PetsAllowed;
    }

    public void setPetsAllowed(Boolean petsAllowed) {
        PetsAllowed = petsAllowed;
    }

    public Boolean getPartiesAllowed() {
        return PartiesAllowed;
    }

    public void setPartiesAllowed(Boolean partiesAllowed) {
        PartiesAllowed = partiesAllowed;
    }

    public Boolean getSmokingAllowed() {
        return SmokingAllowed;
    }

    public void setSmokingAllowed(Boolean smokingAllowed) {
        SmokingAllowed = smokingAllowed;
    }
}
