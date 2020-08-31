import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  authorizationHeader(): { headers: { Authorization: string } }{
    return { headers: {Authorization: localStorage.getItem('token') }  };
  }


}
