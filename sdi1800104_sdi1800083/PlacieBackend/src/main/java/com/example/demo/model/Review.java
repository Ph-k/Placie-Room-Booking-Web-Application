package com.example.demo.model;


import lombok.Data;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class Review {
    private @Id @GeneratedValue Long ReviewId;

    @Column(nullable = false)
    private Long ReservationId;

    @Column(nullable = false)
    private Integer ReviewStars;

    private String ReviewText;

    public Review() {}

    public Review(Long reviewId, Long reservationId, Integer reviewStars, String reviewText) {
        ReviewId = reviewId;
        ReservationId = reservationId;
        ReviewStars = reviewStars;
        ReviewText = reviewText;
    }
}
