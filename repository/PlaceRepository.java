package com.example.demo.repository;

import com.example.demo.model.Message;
import com.example.demo.model.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PlaceRepository extends JpaRepository<Place, Long> {
    @Query(value = "SELECT * FROM place WHERE host_id=?1", nativeQuery = true)
    List<Place> PlacesByHost(Long HostId);

    @Query(value = "SELECT * FROM place WHERE region=?1", nativeQuery = true)
    List<Place> PlacesByRegion(String region);
}
