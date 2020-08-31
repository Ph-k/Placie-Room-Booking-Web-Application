import { Component, OnInit } from '@angular/core';
import {PlaceService} from '../service/place.service';
import {Place} from '../../model/Place';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-all-places',
  templateUrl: './all-places.component.html',
  styleUrls: ['./all-places.component.css']
})
export class AllPlacesComponent implements OnInit {

  places: Place[];
  filteredPlaces: Place[];
  numOfPlaces: number;
  numOfPages: number;
  currentPage: number;

  minPrice = null;
  maxPrice = null;

  constructor(private placeService: PlaceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.placeService.searchPlaces(
      this.route.snapshot.paramMap.get('checkIn'),
      this.route.snapshot.paramMap.get('checkOut'),
      this.route.snapshot.paramMap.get('Country'),
      this.route.snapshot.paramMap.get('City'),
      this.route.snapshot.paramMap.get('District'),
      this.route.snapshot.paramMap.get('maxCapacity')
    ).subscribe(places => {
      this.places = places;
      this.filteredPlaces = this.places.slice();
      this.numOfPlaces = this.places.length;
      this.setNumOfPages();
      this.currentPage = 1;
      console.log(this.numOfPages);
    });
  }

  getFilteredPlaces(): void{
    this.filteredPlaces = [];
    const length = this.places.length;
    for (let i = 0; i < length; i++) {
      if (this.places[i].minCost >= this.minPrice && this.places[i].minCost <= this.maxPrice){
        this.filteredPlaces.push(this.places[i]);
      }
    }
    this.setNumOfPages();
  }

  setNumOfPages(): void{
    this.numOfPages = Math.ceil(this.filteredPlaces.length / 9 );
  }

  GetImageUrl(id: number): string{
    return this.placeService.GetImageUrl(id.toString());
  }

  nextPage(): void{
    if (this.currentPage < this.numOfPages){
      this.currentPage ++;
    }
  }

  previousPage(): void{
    if (this.currentPage > 1){
      this.currentPage --;
    }
  }

  setPage(i: number): void{
    this.currentPage = i;
  }

}
