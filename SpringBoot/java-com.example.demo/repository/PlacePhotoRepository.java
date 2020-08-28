package com.example.demo.repository;


import com.example.demo.model.Place;
import com.example.demo.model.PlacePhoto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PlacePhotoRepository extends JpaRepository<PlacePhoto, Long> {

    @Modifying
    @Query(value = "UPDATE place_photo SET photo_url = ?1 WHERE place_photo_id = ?2", nativeQuery = true)
    int setPhotoUrl(String path, Long placeId);

    @Query(value = "SELECT place_photo_id FROM place_photo WHERE place_id=?1", nativeQuery = true)
    int[] getPhotosId(Long placeId);
}
