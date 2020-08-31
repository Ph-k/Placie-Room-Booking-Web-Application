import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  checkIn: Date;
  checkOut: Date;
  country: string;
  district: string;
  city: string;
  persons: number;

  InvalidDate: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.InvalidDate = false;
    this.country = null;
    this.district = null;
    this.city = null;
    this.persons = null;
  }

  ShowApartments(): void {
    if(this.checkIn === undefined) { return; }
    if(this.checkOut === undefined) { return; }
    if (this.checkIn > this.checkOut){
      this.InvalidDate = true;
      return;
    }
    if (this.country === null) { this.country = 'null'; }
    if (this.district === null) { this.district = 'null'; }
    if (this.city === null) { this.city = 'null'; }
    if (this.persons === null) { this.persons = -1; }
    this.router.navigateByUrl('/places/' + this.checkIn + '/' + this.checkOut + '/' + this.country + '/' + this.city + '/' + this.district + '/' + this.persons.toString() );
  }
}
