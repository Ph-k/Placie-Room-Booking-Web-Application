package com.example.demo.repository;

import com.example.demo.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query(value = "SELECT rev.* FROM review rev,reservation res WHERE rev.reservation_id=res.reservation_id AND res.place_id=?1", nativeQuery = true)
    List<Review> ReviewsForPlace(Long PlaceId);

    @Query(value = "SELECT * FROM review WHERE reservation_id=?1", nativeQuery = true)
    Review ReviewsForReservation(Long ReservationId);

    @Query(value = "SELECT AVG(review_stars) FROM review rev,reservation res WHERE rev.reservation_id=res.reservation_id AND res.place_id = ?1", nativeQuery = true)
    Optional<Number> AverageStars(Long PlaceId);
}
