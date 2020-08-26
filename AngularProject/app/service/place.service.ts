import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Place} from '../../model/Place';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private placesUrl = 'https://localhost:8443/Places';

  constructor(private http: HttpClient) { }


  authorizationHeader(): { headers: { Authorization: string } }{
    return { headers: {Authorization: localStorage.getItem('token') }  };
  }

  post(place: Place): Observable<Place> {
    return this.http.post<Place>(this.placesUrl, place, this.authorizationHeader());
  }

  getPlaces(): Observable<Place[]>{
    return this.http.get<Place[]>(this.placesUrl, this.authorizationHeader());
  }

  getPlacesBy(hostId: number): Observable<Place[]>{
    return this.http.get<Place[]>('https://localhost:8443/PlacesBy/' + hostId.toString(), this.authorizationHeader());
  }

  UploadImage(PlaceId: number, Image: File): number{
    const formdata  = new FormData();
    formdata.append('file', Image, Image.name);

    this.http.post<any>(this.placesUrl + '/Image/' + PlaceId, formdata, this.authorizationHeader())
      .subscribe(
        response => {
          console.log('image uploaed' + response);
        }
      );
    return 0;
  }

}
