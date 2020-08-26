package com.example.demo.model;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


@Data
@Entity
public class Place {
    private @Id
    @GeneratedValue
    Long PlaceId;

    @NotNull
    private Long HostId;

    private Float Area;

    private String MainPhotoUrl;

    @NotNull
    private String Country;

    @NotNull
    private String City;

    @NotNull
    private String District;


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

    public Place() {
    }

    public Place(Long placeId, Long hostId, String mainPhotoUrl, String country, String city,
                 String district, String address, String openStreetMapUrl, String transportation,
                 String description, String type, Float minCost, Float additionalCostPerPerson,
                 Integer maxCapacity, Integer numberOfBeds, Integer numberOfSleepingRooms,
                 Integer minimumRentingDates, Boolean livingRoom, Boolean wiFi, Boolean airConditioning,
                 Boolean heating, Boolean parking, Boolean elevator, Boolean petsAllowed,
                 Boolean partiesAllowed, Boolean smokingAllowed , Float area) {
        PlaceId = placeId;
        HostId = hostId;
        MainPhotoUrl = mainPhotoUrl;
        Country = country;
        City = city;
        District = district;
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
        Area = area;
    }
}
