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
  filtersShown = false;

  minPrice = null;
  maxPrice = null;
  additionalCostPerPerson = null;
  type = null;
  minArea = null;
  minNumOfBeds = null;
  minNumOfSleepingRooms = null;
  livingRoom = false;
  wiFi = false;
  airConditioning = false;
  heating = false;
  parking = false;
  elevator = false;
  petsAllowed = false;
  partiesAllowed = false;
  smokingAllowed = false;

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
      this.filteredPlaces.push(this.places[i]);
    }

    if (this.minPrice != null) {
      this.filteredPlaces = this.filteredPlaces.filter(place => place.minCost >= this.minPrice);
    }

    if (this.maxPrice != null) {
      this.filteredPlaces = this.filteredPlaces.filter(place => place.minCost <= this.maxPrice);
    }

    if (this.type != null && this.type !== 'null') {
      this.filteredPlaces = this.filteredPlaces.filter(place => place.type  === this.type);
    }

    if (this.additionalCostPerPerson != null) {
      this.filteredPlaces = this.filteredPlaces.filter(place => place.additionalCostPerPerson  <= this.additionalCostPerPerson);
    }

    if (this.minArea != null){
      this.filteredPlaces = this.filteredPlaces.filter (place => place.area >= this.minArea);
    }

    if (this.minArea != null){
      this.filteredPlaces = this.filteredPlaces.filter (place => place.area >= this.minArea);
    }

    if (this.minNumOfBeds != null){
      this.filteredPlaces = this.filteredPlaces.filter (place => place.numberOfBeds >= this.minNumOfBeds);
    }

    if (this.minNumOfSleepingRooms != null){
      this.filteredPlaces = this.filteredPlaces.filter (place => place.numberOfSleepingRooms >= this.minNumOfSleepingRooms);
    }

    if (this.minNumOfSleepingRooms != null){
      this.filteredPlaces = this.filteredPlaces.filter (place => place.numberOfSleepingRooms >= this.minNumOfSleepingRooms);
    }

    if (this.livingRoom){
      this.filteredPlaces = this.filteredPlaces.filter( place => place.livingRoom === true);
    }

    if (this.wiFi){
      this.filteredPlaces = this.filteredPlaces.filter( place => place.wiFi === true);
    }

    if (this.airConditioning){
      this.filteredPlaces = this.filteredPlaces.filter( place => place.airConditioning === true);
    }

    if (this.heating){
      this.filteredPlaces = this.filteredPlaces.filter( place => place.heating === true);
    }

    if (this.parking){
      this.filteredPlaces = this.filteredPlaces.filter( place => place.parking === true);
    }

    if (this.elevator){
      this.filteredPlaces = this.filteredPlaces.filter( place => place.elevator === true);
    }

    if (this.petsAllowed){
      this.filteredPlaces = this.filteredPlaces.filter( place => place.petsAllowed === true);
    }

    if (this.partiesAllowed){
      this.filteredPlaces = this.filteredPlaces.filter( place => place.partiesAllowed === true);
    }

    if (this.smokingAllowed){
      this.filteredPlaces = this.filteredPlaces.filter( place => place.smokingAllowed === true);
    }



    this.setNumOfPages();
  }

  setNumOfPages(): void{
    this.numOfPages = Math.ceil(this.filteredPlaces.length / 9 );
  }

  showFilters(): void{
    this.filtersShown = true;
  }

  hideFilters(): void{
    this.filtersShown = false;
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
