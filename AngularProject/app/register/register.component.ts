import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {User} from '../../model/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public userService: UserService) {}

  user: User;
  passwordVerification = '';       // variable  used for password verification
  attemptedRegistration = false;   // When 'register' button is clicked it becomes true

  ngOnInit(): void {
    this.user = {userName: '', password: '', telephone: '', firstName: '', photoUrl: '', email: '', lastName: '',
      isHost: false, isTenant: false, isAdmin: false , userId: null};
  }

  register(): void{
    this.attemptedRegistration = true;
    if (!this.emptyFields() && this.passwordMatch()) {
      this.userService.register(this.user);
    }
  }

  successfulRegistration(): boolean{
    if (this.userService.registerResponse != null && this.userService.registerResponse != ''){
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
}
