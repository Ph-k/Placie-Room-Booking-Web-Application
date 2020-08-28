import {Component, forwardRef, Host, Inject, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {User} from '../../model/User';
import {PendingHost} from '../../model/PendingHost';
import {ActivatedRoute, Router} from '@angular/router';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute,
              @Inject(forwardRef(() => AppComponent)) private parent: AppComponent) {}

  user: User;
  registerStatus = 0;              // Becomes 1 for existing username , 2 for successful registration , 3 for no server response
  passwordVerification = '';       // variable  used for password verification
  attemptedRegistration = false;   // When 'register' button is clicked it becomes true
  imageFile: File;
  private ImageFileType: string;
  InvalidFileType = false;
  ImageTooLarge = false;
  pendingHost: PendingHost;
  private MainPageUrl: string;
  private LoggedIn = false;



  ngOnInit(): void {
    this.MainPageUrl = this.route.snapshot.queryParams.MainPageUrl || '/';
    this.user = {userName: '', password: '', telephone: '', firstName: '', ProfilePhoto: null, email: '', lastName: '',
      isHost: false, isTenant: false, isAdmin: false , userId: null};

    this.pendingHost = { userId: 0};

    this.LoggedIn = false;
    this.attemptedRegistration = false;
    this.InvalidFileType = false;
    this.ImageTooLarge = false;
  }


  register(): void{
    this.attemptedRegistration = true;
    if (!this.emptyFields() && this.passwordMatch() && !this.smallPassword()) {
      this.userService.register(this.user, this.user.isHost).
      subscribe(response => {
          if (response == null) {
            this.registerStatus = 1;
          }
          else {
            this.registerStatus = 2;
            this.user.userId = response.userId;
          }
        },
        error => {this.registerStatus = 3; }
      );
    }

  }

  successfulRegistration(): boolean{
    if (this.registerStatus === 2  && this.passwordMatch() && !this.emptyFields() && this.attemptedRegistration === true) {
      if (this.LoggedIn === false) {
        localStorage.clear();
        this.userService.LoginRequest(this.user.userName, this.user.password).subscribe(
          response => {
            localStorage.setItem('token', response.headers.get('Authorization'));
            localStorage.setItem('username', this.user.userName);
            if (this.imageFile != null){
              this.userService.UploadImage(this.user.userName, this.imageFile);
            }
            if (this.user.isHost){
              this.userService.uploadPendingHost(this.user.userId);
            }
            this.parent.GetUser();
            this.router.navigateByUrl('/searchForm');
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

  smallPassword(): boolean {
    return this.attemptedRegistration && this.user.password.length < 4;
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

  private CheckImageType(file: File): string{
    let FileType = '';
    let Index: number = file.name.length;

    while (file.name.charAt(Index) !== '.' || Index < 0 ){
      FileType = file.name.charAt(Index) + FileType;
      Index--;
    }
    FileType = file.name.charAt(Index) + FileType; // '.'

    switch (FileType) {
      case '.png':
        return '.png';
      case '.jpg':
        return '.jpg';
      case '.jpeg':
        return '.jpeg';
      case '.gif':
        return '.gif';
      default:
        return null;
    }
  }

  uploadPhoto(event): void{
    this.ImageFileType = this.CheckImageType(event.target.files[0]);

    if (event.target.files[0].size > 10000000){
      this.imageFile = null;
      this.ImageTooLarge = true;
      return;
    }else { this.ImageTooLarge = false; }

    if ( this.ImageFileType !== null){
      this.imageFile = event.target.files[0];
      this.InvalidFileType = false;
    }else{
      this.imageFile = null;
      this.InvalidFileType = true;
    }
  }

}
