import { Component, OnInit } from '@angular/core';
import {Place} from '../../../model/Place';
import {PlaceService} from '../../service/place.service';

declare var ol: any;

@Component({
  selector: 'app-new-place',
  templateUrl: './new-place.component.html',
  styleUrls: ['./new-place.component.css']
})
export class NewPlaceComponent implements OnInit {

  place: Place;

  attemptedUpload = false;
  imageFile: File;
  ImageFileType: string;
  InvalidFileType = false;
  ImageTooLarge = false;

  coordinate: any;
  map: any;
  feature: any;
  layer: any;
  style: any;

  constructor(private placeService: PlaceService) { }

  ngOnInit(): void {

    this.layer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [
          new ol.Feature()
        ]
      })
    });

    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([ 23.726110, 37.970833]),
        zoom: 1
      })
    });



    this.place = {
      placeId : null ,
      hostId: null ,
      mainPhotoUrl: null,
      country: '',
      city: '',
      district: '',
      address: '',
      xcoordinate: null,
      ycoordinate: null,
      transportation: '',
      description: '',
      type: '',
      area: null,
      minCost: null,
      additionalCostPerPerson: null,
      maxCapacity: null,
      numberOfBeds: null,
      numberOfSleepingRooms: null,
      minimumRentingDates: null,
      livingRoom: false,
      wiFi: false,
      airConditioning : false,
      heating: false,
      parking: false,
      elevator: false,
      petsAllowed: false,
      partiesAllowed: false,
      smokingAllowed: false
    };
    this.InvalidFileType = false;
    this.ImageTooLarge = false;


  }

  getCoordinates(event: any): void{
    this.coordinate = this.map.getEventCoordinate(event);
    console.log(ol.proj.transform(this.coordinate , 'EPSG:3857', 'EPSG:4326'));
    this.layer.getSource().clear();

    this.feature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat(ol.proj.transform(this.coordinate , 'EPSG:3857', 'EPSG:4326')))
    });

    this.style = new ol.style.Style({
      image: new ol.style.Icon({
        scale: 0.02,
        src: '../assets/point.png'
      })
    });

    this.feature.setStyle(this.style);

    this.layer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [
          this.feature
        ],
        style: this.style
      })
    });

    this.map.addLayer(this.layer);
    this.place.xcoordinate = ol.proj.transform(this.coordinate, 'EPSG:3857', 'EPSG:4326')[0];
    this.place.ycoordinate = ol.proj.transform(this.coordinate, 'EPSG:3857', 'EPSG:4326')[1];

  }

  uploadPlace(): void{
    this.attemptedUpload = true;
    if (this.validInputs() && this.locationPicked()){
      this.placeService.post(this.place).subscribe(
        result => {
          window.location.href = '/myPlaces';
          if (this.imageFile != null) {
            this.placeService.UploadMainImage(result.placeId, this.imageFile).subscribe();
          }
        }
      );
    }
  }

  validInputs(): boolean{
    return ( this.place.area > 0 && this.place.minCost > 0 && this.place.additionalCostPerPerson > 0
            && this.place.maxCapacity > 0 && this.place.numberOfBeds > 0 && this.place.numberOfSleepingRooms > 0);
  }

  locationPicked(): boolean{
    return (this.place.xcoordinate != null);
  }

  private CheckImageType(file: File): string{
    let FileType = '';
    let Index: number = file.name.length;

    while (file.name.charAt(Index) !== '.' || Index < 0 ){
      FileType = file.name.charAt(Index) + FileType;
      Index--;
    }
    FileType = file.name.charAt(Index) + FileType; // '.'

    switch (FileType) {
      case '.png':
        return '.png';
      case '.jpg':
        return '.jpg';
      case '.jpeg':
        return '.jpeg';
      case '.gif':
        return '.gif';
      default:
        return null;
    }
  }

  uploadPhoto(event): void{
    this.ImageFileType = this.CheckImageType(event.target.files[0]);

    if (event.target.files[0].size > 10000000){
      this.imageFile = null;
      this.ImageTooLarge = true;
      return;
    }else { this.ImageTooLarge = false; }

    if ( this.ImageFileType !== null){
      this.imageFile = event.target.files[0];
      this.InvalidFileType = false;
    }else{
      this.imageFile = null;
      this.InvalidFileType = true;
    }
  }

}
