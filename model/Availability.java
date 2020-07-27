package com.example.demo.model;

import com.sun.istack.NotNull;
import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Data
@Entity
public class Availability {
    private @Id @GeneratedValue Long AvailabilityId;

    @NotNull
    private Long PlaceId;

    @NotNull
    private Date StartingDate;

    @NotNull
    private Date EndingDate;

    public  Availability() {}

    public Availability(Long availabilityId, Long placeId, Date startingDate, Date endingDate) {
        AvailabilityId = availabilityId;
        PlaceId = placeId;
        StartingDate = startingDate;
        EndingDate = endingDate;
    }

    public Long getAvailabilityId() {
        return AvailabilityId;
    }

    public void setAvailabilityId(Long availabilityId) {
        AvailabilityId = availabilityId;
    }

    public Long getPlaceId() {
        return PlaceId;
    }

    public void setPlaceId(Long placeId) {
        PlaceId = placeId;
    }

    public Date getStartingDate() {
        return StartingDate;
    }

    public void setStartingDate(Date startingDate) {
        StartingDate = startingDate;
    }

    public Date getEndingDate() {
        return EndingDate;
    }

    public void setEndingDate(Date endingDate) {
        EndingDate = endingDate;
    }
}
