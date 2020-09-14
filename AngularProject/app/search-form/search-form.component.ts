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

    // if not valid dates/number of people are entered , then returns without proceeding to the available places
    if (this.checkIn === undefined || this.checkOut === undefined || this.persons === null
        || !Number.isInteger(this.persons) || this.persons <= 0)  { return; }

    if (this.checkIn > this.checkOut){
      this.InvalidDate = true;
      return;
    }

    // If the user did not specify these fields they are passed as null strings
    if (this.country === null) { this.country = 'null'; }
    if (this.district === null) { this.district = 'null'; }
    if (this.city === null) { this.city = 'null'; }

    // saves dates to the local storage so that user won't be asked to enter the dates/number of people again while reserving a place
    localStorage.setItem('startingDate', this.checkIn.toString());
    localStorage.setItem('endingDate', this.checkOut.toString());
    localStorage.setItem('numOfPersons', this.persons.toString());

    // proceed to show places available in these dates
    this.router.navigateByUrl('/places/' + this.checkIn + '/' + this.checkOut + '/' + this.country + '/' + this.city + '/' + this.district + '/' + this.persons.toString() );
  }
}
