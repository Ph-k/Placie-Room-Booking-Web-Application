import { Component } from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Angular';

  registration = false;

  constructor(private router: Router, private UserSer: UserService) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.registration = event.url === '/register';
      }
    });
  }

  GetUsername(): string{
    if (this.UserSer.LoggedIn()) {
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
          this.UserSer.refreshToken();
        }, error => {
          if (error.status === 403) {
            alert('Invalid username and/or password');
          }
        }
      );
  }

  Logout(event: any) {
    this.UserSer.Logout();
    window.location.href = '/';

  }

  LoggedIn(): boolean{
    return this.UserSer.LoggedIn();
  }
}
