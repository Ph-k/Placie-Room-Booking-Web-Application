import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../model/User';
import {PendingHost} from '../../model/PendingHost';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private registrationUrl = 'https://localhost:8443/Registration';
  private usersUrl = 'https://localhost:8443/Users';
  private pendingHostsUrl = 'https://localhost:8443/PendingHosts';

  registerResponse: User; // Used to receive the response when registering a new user

  constructor(private http: HttpClient) {
  }

  register(user: User, host: boolean): void {
    this.http.post<User>(this.registrationUrl, user).subscribe(response => {this.registerResponse = response; console.log(this.registerResponse); if (host){this.uploadPendingHost(this.registerResponse.userId); }});
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.usersUrl);
  }

  getUser(id: string): Observable<User>{
    return this.http.get<User>(this.usersUrl + '/' + id);
  }

  updateUser(user: User, id: number): void{
    this.http.put<any>(this.usersUrl + '/118', user).subscribe();
  }

  getPendingHost(id: string): Observable<PendingHost>{
    return this.http.get<PendingHost>(this.pendingHostsUrl + '/' + id);
  }

  uploadPendingHost(pendingHost: number): void{
    this.http.post<any>(this.pendingHostsUrl, pendingHost).subscribe();
  }

  deletePendingHost(pendingHost: number): void{
    this.http.delete('https://localhost:8443/PendingHosts/118').subscribe();
  }

}
