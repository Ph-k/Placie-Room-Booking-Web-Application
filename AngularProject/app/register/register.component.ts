import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {User} from '../../model/User';
import {PendingHost} from '../../model/PendingHost';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService) {}

  user: User;
  passwordVerification = '';       // variable  used for password verification
  attemptedRegistration = false;   // When 'register' button is clicked it becomes true
  imageFile: File;
  pendingHost: PendingHost;


  ngOnInit(): void {
    this.user = {userName: '', password: '', telephone: '', firstName: '', photoUrl: '', email: '', lastName: '',
      isHost: false, isTenant: false, isAdmin: false , userId: null};

    this.pendingHost = { userId: 0};
  }


  register(): void{
    this.attemptedRegistration = true;

    if (!this.emptyFields() && this.passwordMatch()) {
      this.userService.register(this.user, this.user.isHost);
      if (this.user.isHost){
        this.user.isHost = false;
      }
    }
  }

  successfulRegistration(): boolean{
    if (this.userService.registerResponse != null  && this.passwordMatch() &&
        !this.emptyFields()){
      return true;
    }

    else{
      return false;
    }
  }

  usernameExists(): boolean{
    if (this.userService.registerResponse == null && this.attemptedRegistration){
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
    console.log(this.imageFile);
  }
}
