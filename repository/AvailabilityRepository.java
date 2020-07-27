package com.example.demo.repository;

import com.example.demo.model.Availability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AvailabilityRepository extends JpaRepository<Availability, Long> {
    @Query(value = "SELECT * FROM availability WHERE place_id=?1", nativeQuery = true)
    List<Availability> getPlaceAvailability(Long PlaceId);
}
