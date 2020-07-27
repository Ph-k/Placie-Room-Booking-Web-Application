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

    public Long getReservationId() {
        return ReservationId;
    }

    public void setReservationId(Long reservationId) {
        ReservationId = reservationId;
    }

    public Integer getReviewStars() {
        return ReviewStars;
    }

    public void setReviewStars(Integer reviewStars) {
        ReviewStars = reviewStars;
    }

    public String getReviewText() {
        return ReviewText;
    }

    public void setReviewText(String reviewText) {
        ReviewText = reviewText;
    }

    public Review(Long reservationId, Integer reviewStars, String reviewText) {
        ReservationId = reservationId;
        ReviewStars = reviewStars;
        ReviewText = reviewText;
    }
}
