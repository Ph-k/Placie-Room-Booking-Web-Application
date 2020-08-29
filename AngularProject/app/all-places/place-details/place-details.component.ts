import { Component, OnInit } from '@angular/core';
import {Place} from '../../../model/Place';
import {Availability} from '../../../model/Availability';
import {PlaceService} from '../../service/place.service';
import {ActivatedRoute, Router} from '@angular/router';

declare var ol: any;
@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.css']
})
export class PlaceDetailsComponent implements OnInit {

  place: Place;
  private id: string;
  availabilities: Availability[];
  PlacePhotosIds: number[];
  placeNotFound = false;

  map: any;
  feature: any;
  layer: any;
  style: any;

  constructor(private placeService: PlaceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.placeService.getPlace(this.id).subscribe(place => {
      this.place = place;

      this.map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([ this.place.xcoordinate, this.place.ycoordinate]),
          zoom: 15
        })
      });

      this.feature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([ this.place.xcoordinate, this.place.ycoordinate]))
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
    } , error => this.placeNotFound = true);
    this.placeService.GetPlacesPhotosIds(Number(this.id)).subscribe(
      Ids => this.PlacePhotosIds = Ids
    );
    this.setPlacePhotosIds();
  }

  setPlacePhotosIds(): void{
    this.placeService.GetPlacesPhotosIds(Number(this.id)).subscribe(
      Ids => this.PlacePhotosIds = Ids
    );
  }

  GetImageUrl(): string{
    return this.placeService.GetImageUrl(this.id);
  }

  FullsizeImage(PlacePhotosId: number): void {
    window.open(this.placeService.GetPlacePhotoUrl(PlacePhotosId));
  }

}
