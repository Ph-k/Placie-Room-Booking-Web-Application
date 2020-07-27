package com.example.demo.model;

import com.sun.istack.NotNull;
import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class Review {
    private @Id @GeneratedValue Long ReservationId;

    @NotNull
    private Integer ReviewStars;

    private String ReviewText;

    public Review() {}

    public Review(Long reservationId, Integer reviewStars, String reviewText) {
        ReservationId = reservationId;
        ReviewStars = reviewStars;
        ReviewText = reviewText;
    }
}
