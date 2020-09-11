import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Place} from '../../model/Place';
import {Availability} from '../../model/Availability';
import {Reservation} from '../../model/Reservation';
import {Review} from '../../model/Review';
import {PlacePhoto} from '../../model/PlacePhoto';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private placesUrl = 'https://localhost:8443/Places';
  private searchUrl = 'https://localhost:8443/PlacesSearch';
  private availabilityUrl = 'https://localhost:8443/Availabilities' ;
  private reservationUrl = 'https://localhost:8443/Reservations';

  constructor(private http: HttpClient) { }


  authorizationHeader(): { headers: { Authorization: string } }{
    return { headers: {Authorization: localStorage.getItem('token') }  };
  }

  post(place: Place): Observable<Place> {
    return this.http.post<Place>(this.placesUrl, place, this.authorizationHeader());
  }

  updatePlace(place: Place, placeId: string): Observable<Place>{
    return this.http.put<Place>(this.placesUrl + '/' + placeId, place, this.authorizationHeader());
  }

  getPlaces(): Observable<Place[]>{
    return this.http.get<Place[]>(this.placesUrl);
  }

  searchPlaces(checkIn: string, checkOut: string, country: string, city: string, district: string, persons: string): Observable<Place[]>{
    return this.http.get<Place[]>(this.searchUrl
      + '/' + checkIn  + '/' + checkOut  + '/' + country  + '/' + city  + '/' + district + '/' + persons);
  }

  getPlace(placeId: string): Observable<Place>{
    return this.http.get<Place>(this.placesUrl + '/' + placeId);
  }


  getPlacesBy(hostId: number): Observable<Place[]>{
    return this.http.get<Place[]>('https://localhost:8443/PlacesBy/' + hostId.toString(), this.authorizationHeader());
  }

  getAvailabilities(): Observable<Availability[]>
  {
    return this.http.get<Availability[]>(this.availabilityUrl , this.authorizationHeader()) ;
  }

  getAvailabilitiesFor(placeId: string): Observable<Availability[]>
  {
    return this.http.get<Availability[]>(this.availabilityUrl + 'For/' + placeId , this.authorizationHeader()) ;
  }

  uploadAvailability(availability: Availability): Observable<Availability>{
    return this.http.post<Availability>(this.availabilityUrl, availability, this.authorizationHeader());
  }

  deleteAvailability(availabilityId: string): Observable<Availability>{
    return this.http.delete<Availability>(this.availabilityUrl + '/' + availabilityId, this.authorizationHeader());
  }
  UploadMainImage(PlaceId: number, Image: File): Observable<any>{
    const formdata  = new FormData();
    formdata.append('file', Image, Image.name);

    return this.http.post<any>(this.placesUrl + '/MainImage/' + PlaceId, formdata, this.authorizationHeader());
  }

  GetImageUrl(placeiId: string): string{
    return this.placesUrl + '/MainImage/' + placeiId;
  }


  UploadImage(PlaceId: number, imageFile: File): Observable<any> {
    const formdata  = new FormData();
    formdata.append('file', imageFile, imageFile.name);

    return this.http.post<any>(this.placesUrl + '/Images/' + PlaceId, formdata, this.authorizationHeader());

  }

  GetPlacesPhotosIds(placeId: number): Observable<number[]>{
    if (localStorage.getItem('token') == null) {return this.http.get<number[]>(this.placesUrl + '/PhotoRange/' + placeId); }
    return this.http.get<number[]>(this.placesUrl + '/PhotoRange/' + placeId, this.authorizationHeader());
  }

  GetPlacePhotoUrl(photoId: number): string{
    return this.placesUrl + '/Images/' + photoId;
  }

  getReservations(): Observable<Reservation[]>{
    return this.http.get<Reservation[]>(this.reservationUrl, this.authorizationHeader());
  }

  makeReservation(reservation: Reservation): Observable<Boolean>{
    console.log(reservation);
    return this.http.post<Boolean>(this.reservationUrl, reservation , this.authorizationHeader());
  }

  myReservations(): Observable<Reservation[]>{
    return this.http.get<Reservation[]>('https://localhost:8443/MyReservations', this.authorizationHeader());
  }

  ReservationsFor(placeId: string): Observable<Reservation[]>{
    return this.http.get<Reservation[]>('https://localhost:8443/ReservationsFor/' + placeId, this.authorizationHeader());
  }

  getReviews(): Observable<Review[]>{
    return this.http.get<Review[]>('https://localhost:8443/Reviews', this.authorizationHeader());
  }


  postReview(newReview: Review): Observable<Review>{
    return this.http.post<Review>('https://localhost:8443/Reviews', newReview, this.authorizationHeader());
  }

  getReviewsForPlace(placeId: string): Observable<Review[]>{
    return this.http.get<Review[]>('https://localhost:8443/ReviewsFor/' + placeId.toString());
  }

  getReviewsForReservation(reservationId: number): Observable<Review[]>{
    return this.http.get<Review[]>('https://localhost:8443/ReviewsForReservation/' + reservationId.toString());
  }

  getPlacePhotos(): Observable<PlacePhoto[]> {
    return this.http.get<PlacePhoto[]>('https://localhost:8443/PlacePhotos', this.authorizationHeader());
  }

  getPlacePhotosXML(): Observable<string> {
    const httpHeader: HttpHeaders = new HttpHeaders({
      Accept: 'application/xml',
      Authorization: localStorage.getItem('token')
    });
    return this.http.get('https://localhost:8443/PlacePhotos', { headers: httpHeader , responseType: 'text'});
  }

  getAverageStars(placeId: number): Observable<number>{
    return this.http.get<number>('https://localhost:8443/AverageStars/' + placeId);
  }

}
