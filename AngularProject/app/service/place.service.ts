import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Place} from '../../model/Place';
import {Availability} from '../../model/Availability';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private placesUrl = 'https://localhost:8443/Places';
  private availabilityUrl = 'https://localhost:8443/Availabilities' ;

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
    if (localStorage.getItem('token') == null)return this.http.get<number[]>(this.placesUrl + '/PhotoRange/' + placeId);
    return this.http.get<number[]>(this.placesUrl + '/PhotoRange/' + placeId, this.authorizationHeader());
  }

  GetPlacePhotoUrl(photoId: number): string{
    return this.placesUrl + '/Images/' + photoId;
  }

}
