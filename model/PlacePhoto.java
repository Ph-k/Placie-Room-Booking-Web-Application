package com.example.demo.model;

import com.sun.istack.NotNull;
import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class PlacePhoto {
    private @Id @GeneratedValue Long PlacePhotoId;

    @NotNull
    private Long PlaceId;

    @NotNull
    private String PhotoUrl;

    public PlacePhoto(){}

    public PlacePhoto(Long placePhotoId, Long placeId, String photoUrl) {
        PlacePhotoId = placePhotoId;
        PlaceId = placeId;
        PhotoUrl = photoUrl;
    }

    public Long getPlacePhotoId() {
        return PlacePhotoId;
    }

    public void setPlacePhotoId(Long placePhotoId) {
        PlacePhotoId = placePhotoId;
    }

    public Long getPlaceId() {
        return PlaceId;
    }

    public void setPlaceId(Long placeId) {
        PlaceId = placeId;
    }

    public String getPhotoUrl() {
        return PhotoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        PhotoUrl = photoUrl;
    }
}
