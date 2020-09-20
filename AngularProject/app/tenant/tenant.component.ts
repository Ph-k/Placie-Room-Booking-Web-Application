import { Component, OnInit } from '@angular/core';
import {PlaceService} from '../service/place.service';
import {Reservation} from '../../model/Reservation';
import {Review} from '../../model/Review';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.css']
})
export class TenantComponent implements OnInit {

  reservations: Reservation[];
  review: Review;
  reviewFor = -1;

  constructor(private placeService: PlaceService) { }

  ngOnInit(): void {
    this.review = { reviewId: null , reviewStars : null , reviewText: null, reservationId: null};
    this.placeService.myReservations().subscribe(reservations => this.reservations = reservations);
  }

  initializeReview(): void{
    this.review = { reviewId: null , reviewStars : null , reviewText: null, reservationId: null};
  }

  submitReview(): void{
    if (this.review.reviewStars < 0 || this.review.reviewStars > 5 || this.review.reviewStars == null) {
      return;
    }
    this.review.reservationId = this.reviewFor;
    this.placeService.postReview(this.review).subscribe(review => {
      if (review == null) {window.alert('You already made a review for this reservation!'); }
    });
    this.reviewFor = -1;
  }

  showReview(id: number): void{
    this.initializeReview();
    this.reviewFor = id;
  }

}
