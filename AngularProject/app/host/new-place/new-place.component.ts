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

  constructor(private placeService: PlaceService) { }

  ngOnInit(): void {
    this.place = {
      placeId : null ,
      hostId: null ,
      mainPhotoUrl: '',
      country: '',
      city: '',
      province: '',
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
  }

  uploadPlace(): void{
    this.placeService.post(this.place).subscribe();
  }

}
