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

}
