import { Component, OnInit } from '@angular/core';
import {PlaceService} from '../../../service/place.service';
import {Place} from '../../../../model/Place';
import {ActivatedRoute, Router} from '@angular/router';
import {Availability} from '../../../../model/Availability';

declare var ol: any;
@Component({
  selector: 'app-place-details',
  templateUrl: './edit-place.component.html',
  styleUrls: ['./edit-place.component.css']
})
export class EditPlaceComponent implements OnInit {

  place: Place;
  availability: Availability;
  availabilities: Availability[];
  private id: string;
  placeNotFound = false;
  imageFile: File;
  private ImageFileType: string;
  InvalidFileType = false;
  ImageTooLarge = false;
  successfulUpdate = false;
  attemptedUpdate = false;
  PlacePhotosIds: number[];

  coordinate: any;
  map: any;
  feature: any;
  layer: any;
  style: any;
  
  constructor(private placeService: PlaceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
	this.availability = new Availability();
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
      this.refreshAvailabilities();
    } , error => this.placeNotFound = true);

    this.placeService.GetPlacesPhotosIds(Number(this.id)).subscribe(
      Ids => this.PlacePhotosIds = Ids
        );
  }

  updatePlace(): void {
    this.attemptedUpdate = true;
    if (this.validInputs()) {
      this.placeService.updatePlace(this.place, this.place.placeId.toString()).subscribe(response => {
        this.successfulUpdate = true;
        window.location.href = '/myPlaces';
      });
    }
  }
	
  uploadAvailability(): void{
    this.availability.placeId = this.place.placeId;
    if (this.availability.startingDate < this.availability.endingDate) {
      this.placeService.uploadAvailability(this.availability).subscribe(response => this.refreshAvailabilities());
    }
  }

  deleteAvailability(id: number): void{
    this.placeService.deleteAvailability(id.toString()).subscribe();
    this.refreshAvailabilities();
  }

  refreshAvailabilities(): void{
    this.placeService.getAvailabilitiesFor(this.place.placeId.toString()).subscribe(response => this.availabilities = response);
  }
  
  validInputs(): boolean{
    return ( this.place.area > 0 && this.place.minCost > 0 && this.place.additionalCostPerPerson > 0
      && this.place.maxCapacity > 0 && this.place.numberOfBeds > 0 && this.place.numberOfSleepingRooms > 0);
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

  private CheckPhoto(file: File): boolean{
    this.ImageFileType = this.CheckImageType(file);

    if (file.size > 10000000){
      this.imageFile = null;
      this.ImageTooLarge = true;
      return false;
    }else { this.ImageTooLarge = false; }

    if ( this.ImageFileType === null){
      this.imageFile = null;
      this.InvalidFileType = true;
      return false;
    }else{
      this.imageFile = file;
      this.InvalidFileType = false;
      return true;
    }
  }

  updateMainPhoto(event): void{
    if (this.CheckPhoto(event.target.files[0])){
      this.placeService.UploadMainImage( Number(this.id), this.imageFile);
      window.location.reload();
    }
  }

  GetImageUrl(): string{
    return this.placeService.GetImageUrl(this.id);
  }

  async uploadPlacePhoto(event): Promise<void> {
    if (this.CheckPhoto(event.target.files[0])){
      await this.placeService.UploadImage(Number(this.id), this.imageFile).then(
        end => this.router.navigateByUrl('/editPlaces/' + this.id)
      );
    }
  }

  FullsizeImage(PlacePhotosId: number): void {
    window.open(this.placeService.GetPlacePhotoUrl(PlacePhotosId));
  }
}
