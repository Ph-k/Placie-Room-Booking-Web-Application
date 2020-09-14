import { Component } from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import { UserService } from './service/user.service';
import {User} from '../model/User';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Placie';

  user: User; // Logged In User's object
  registration = false; // Boolean represents if the user is in the register page (Needed to hide menu bar)


  constructor(private router: Router, private UserSer: UserService) {
    this.user = {userName: '', password: '', telephone: '', firstName: '', ProfilePhoto: null, email: '', lastName: '',
      isHost: false, isTenant: false, isAdmin: false , userId: null}; // Dummy user object initialization

    router.events.forEach((event) => {
      // if user navigates to register page, then registration boolean becomes true
      if (event instanceof NavigationStart) {
        this.registration = event.url === '/register';
      }
    });

    this.GetUser();
  }

  // Puts logged in user's information to User object
  GetUser(): void{
    this.UserSer.findUserId(localStorage.getItem('username')).subscribe(response => {
      this.UserSer.getUser(response.toString()).subscribe(user =>
      {
        this.user = user;
        // saves user's roles to local storage
        localStorage.setItem('admin', JSON.stringify(user.isAdmin));
        localStorage.setItem('host', JSON.stringify(user.isHost));
        localStorage.setItem('tenant', JSON.stringify(user.isTenant));
      });
    });
  }

  GetUsername(): string{
    if (this.UserSer.LoggedIn()) { } {
      return localStorage.getItem('username');
    }
    return null;
  }

  Login(event: any) {
    this.UserSer.LoginRequest(event.target.username.value, event.target.password.value)
      .subscribe(
        response => {
          localStorage.setItem('token', response.headers.get('Authorization'));
          localStorage.setItem('username', event.target.username.value);
          this.GetUser();
        }, error => {
          if (error.status === 403) {
            alert('Invalid username and/or password');
          }
        }
      );
  }

  Logout(event: any) {
    localStorage.clear();
    this.UserSer.Logout();
    window.location.href = '/'; // Reload app to search form component

  }

  LoggedIn(): boolean{
    return this.UserSer.LoggedIn();
  }

  GoToHomePage(): void {
    this.router.navigateByUrl('/searchForm');
  }
}
