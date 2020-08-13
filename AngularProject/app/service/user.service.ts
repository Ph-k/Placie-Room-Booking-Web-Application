import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private registrationUrl = 'https://localhost:8443/Registration';

  registerResponse = ''; // Used to receive the response when registering a new user

  constructor(private http: HttpClient) {
  }

  register(user: User): void {
    this.http.post<any>(this.registrationUrl, user).subscribe(response => {this.registerResponse = response; });
  }

}
