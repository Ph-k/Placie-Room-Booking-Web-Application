import { Component, OnInit } from '@angular/core';
import {PlaceService} from '../service/place.service';
import {Reservation} from '../../model/Reservation';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.css']
})
export class TenantComponent implements OnInit {

  reservations: Reservation[];

  constructor(private placeService: PlaceService) { }

  ngOnInit(): void {
    this.placeService.myReservations().subscribe(reservations => this.reservations = reservations);
  }

}
