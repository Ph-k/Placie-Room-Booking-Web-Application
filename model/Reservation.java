package com.example.demo.model;

import com.sun.istack.NotNull;
import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Data
@Entity
public class Reservation {
    private @Id @GeneratedValue Long ReservationId;

    @NotNull
    private Long UserId;

    @NotNull
    private Long PlaceId;

    @NotNull
    private Date StartingDate;

    @NotNull
    private Date EndingDate;

    @NotNull
    private Integer NumberOfPeople;

    public Reservation() {}
    public Reservation(Long reservationId, Long userId, Long placeId, Date startingDate, Date endingDate, Integer numberOfPeople) {
        ReservationId = reservationId;
        UserId = userId;
        PlaceId = placeId;
        StartingDate = startingDate;
        EndingDate = endingDate;
        NumberOfPeople = numberOfPeople;
    }
}
