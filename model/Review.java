package com.example.demo.model;

import com.sun.istack.NotNull;
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
    private Integer ReviewStars;

    private String ReviewText;

    public Review() {}

    public Review(Long reviewId, Integer reviewStars, String reviewText) {
        ReviewId = reviewId;
        ReviewStars = reviewStars;
        ReviewText = reviewText;
    }
}
