import { Component, OnInit } from '@angular/core';
import {PlaceService} from '../../service/place.service';
import {Place} from '../../../model/Place';
import {UserService} from '../../service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  places: Place[];
  constructor(private placeService: PlaceService, private userService: UserService , private router: Router) { }

  ngOnInit(): void {
    this.userService.findUserId(localStorage.getItem('username')).subscribe(id => {
      this.placeService.getPlacesBy(id).subscribe(places => this.places = places); } );
  }

}
