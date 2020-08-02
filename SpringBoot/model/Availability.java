package com.example.demo.model;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Data
@Entity
public class Availability {
    private @Id @GeneratedValue Long AvailabilityId;

    @Column(nullable = false)
    private Long PlaceId;

    @Column(nullable = false)
    private Date StartingDate;

    @Column(nullable = false)
    private Date EndingDate;

    public  Availability() {}

    public Availability(Long availabilityId, Long placeId, Date startingDate, Date endingDate) {
        AvailabilityId = availabilityId;
        PlaceId = placeId;
        StartingDate = startingDate;
        EndingDate = endingDate;
    }
}
