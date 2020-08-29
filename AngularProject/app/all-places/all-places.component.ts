import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {PlaceService} from '../service/place.service';
import {Place} from '../../model/Place';

@Component({
  selector: 'app-all-places',
  templateUrl: './all-places.component.html',
  styleUrls: ['./all-places.component.css']
})
export class AllPlacesComponent implements OnInit {

  places: Place[];

  constructor(private placeService: PlaceService) { }

  ngOnInit(): void {
    this.placeService.getPlaces().subscribe(places => this.places = places);
  }

}
