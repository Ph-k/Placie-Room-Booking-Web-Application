import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {User} from '../../model/User';
import {PendingHost} from '../../model/PendingHost';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {}

  user: User;
  registerStatus = 0;              // Becomes 1 for existing username , 2 for successful registration , 3 for no server response
  passwordVerification = '';       // variable  used for password verification
  attemptedRegistration = false;   // When 'register' button is clicked it becomes true
  imageFile: File;
  pendingHost: PendingHost;
  private MainPageUrl: string;
  private LoggedIn = false;



  ngOnInit(): void {
    this.MainPageUrl = this.route.snapshot.queryParams.MainPageUrl || '/';
    this.user = {userName: '', password: '', telephone: '', firstName: '', photoUrl: '', email: '', lastName: '',
      isHost: false, isTenant: false, isAdmin: false , userId: null};

    this.pendingHost = { userId: 0};

    this.LoggedIn = false;
    this.attemptedRegistration = false;
  }


  register(): void{
    this.attemptedRegistration = true;
    if (!this.emptyFields() && this.passwordMatch()) {
      this.userService.register(this.user, this.user.isHost).
      subscribe(response => { if (response == null)  {this.registerStatus = 1; } else {this.registerStatus = 2; }},
                error => {this.registerStatus = 3; } );
      if (this.user.isHost){
        this.user.isHost = false;
      }
    }
  }

  successfulRegistration(): boolean{
    if (this.registerStatus === 2  && this.passwordMatch() && !this.emptyFields() && this.attemptedRegistration === true){
      if (this.LoggedIn === false) {
        console.log('magic starts' + this.user.userName + this.user.password);
        window.alert('Successful Registration!!, You will be redirected and logged in automagically!');
        this.userService.LoginRequest(this.user.userName, this.user.password).subscribe(
          response => {
            localStorage.setItem('token', response.headers.get('Authorization'));
            localStorage.setItem('username', this.user.userName);
            this.router.navigate([this.MainPageUrl]);
          }
        );
        this.LoggedIn = true;
      }
      return true;
    }
    else{
      return false;
    }
  }

  usernameExists(): boolean{
    if (this.registerStatus === 1 && this.attemptedRegistration){
      return true;
    }
    else{
      return false;
    }
  }

  passwordMatch(): boolean {
    if (this.user.password == this.passwordVerification) {return true; }
    else {return false; }
  }

  emptyFields(): boolean{
    if (this.user.userName == '' || this.user.password == '' || this.user.telephone == '' || this.user.firstName == '' ||
        this.user.email == '' || this.user.lastName == ''){
      return true;
    }
    else {
      return false;
    }
  }

  uploadPhoto(event): void{
    this.imageFile = event.target.files[0];
    this.userService.UploadImage(this.imageFile);
    console.log(this.imageFile);
  }
}
