import { Component, OnInit } from '@angular/core';
import {Place} from '../../../model/Place';
import {PlaceService} from '../../service/place.service';

@Component({
  selector: 'app-new-place',
  templateUrl: './new-place.component.html',
  styleUrls: ['./new-place.component.css']
})
export class NewPlaceComponent implements OnInit {

  place: Place;
  imageFile: File;
  private ImageFileType: string;
  InvalidFileType = false;
  ImageTooLarge = false;

  constructor(private placeService: PlaceService) { }

  ngOnInit(): void {
    this.place = {
      placeId : null ,
      hostId: null ,
      mainPhotoUrl: null,
      country: '',
      city: '',
      district: '',
      address: '',
      openStreetMapUrl: '',
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

  uploadPlace(): void{
    if (this.validInputs()){
      this.placeService.post(this.place).subscribe(
        result => {
          window.location.href = '/myPlaces';
          if (this.imageFile != null) {
            this.placeService.UploadImage(result.placeId, this.imageFile);
          }
        }
      );
    }
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
