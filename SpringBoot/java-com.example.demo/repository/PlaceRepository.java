package com.example.demo.repository;

import com.example.demo.model.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.PathVariable;

import java.sql.Date;
import java.util.List;

public interface PlaceRepository extends JpaRepository<Place, Long> {
    @Query(value = "SELECT * FROM place WHERE host_id=?1", nativeQuery = true)
    List<Place> PlacesByHost(Long HostId);

    @Query(value = "SELECT * FROM place WHERE region=?1", nativeQuery = true)
    List<Place> PlacesByRegion(String region);

    @Modifying
    @Query(value = "UPDATE place SET main_photo_url = ?1 WHERE place_id = ?2", nativeQuery = true)
    int setMainPhotoUrl(String path, Long username);

    @Query(value = "select p.* from place  p, availability a where  " +
            " p.place_id=a.place_id and a.starting_date<= ?1 and a.ending_date>= ?2 AND NOT EXISTS ( " +
            " select * from reservation r where r.place_id=p.place_id AND  " +
            " (r.starting_date between ?1 AND ?2 OR r.ending_date between ?1 AND ?2) " +
            " ) AND p.country LIKE ?3 AND p.city LIKE ?4 AND p.district LIKE ?5 AND p.max_capacity >= ?6 ", nativeQuery = true)
    List<Place> Search(Date checkIn /*1*/, Date checkOut /*2*/, String country /*3*/, String city /*4*/, String district /*5*/, Long persons /*6*/);
}
