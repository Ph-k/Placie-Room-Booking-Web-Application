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

  user: User;                      // object of type User to be sent when registering new User
  registerStatus = 0;              // Becomes 1 for existing username , 2 for successful registration , 3 for no server response
  passwordVerification = '';       // variable  used for password verification
  attemptedRegistration = false;   // When 'register' button is clicked it becomes true
  pendingHost: PendingHost;        // object of type Pending Host to be sent when the new user asks to be a host
  private LoggedIn = false;

  // Used for the image uploading/validating
  imageFile: File;
  private ImageFileType: string;
  InvalidFileType = false;
  ImageTooLarge = false;


  ngOnInit(): void {
    this.user = {userName: '', password: '', telephone: '', firstName: '', ProfilePhoto: null, email: '', lastName: '',
      isHost: false, isTenant: false, isAdmin: false , userId: null}; // Initializing new user

    this.pendingHost = { userId: 0}; // Initializing pending host

    this.LoggedIn = false;
    this.attemptedRegistration = false;
    this.InvalidFileType = false;
    this.ImageTooLarge = false;
  }


  register(): void{
    this.attemptedRegistration = true;

    // If user has entered valid inputs then process to the register request
    if (!this.emptyFields() && this.passwordMatch() && !this.smallPassword()) {
      this.userService.register(this.user, this.user.isHost).
      subscribe(response => {
          if (response == null) {
            this.registerStatus = 1; // Unsuccessful registration because of existing username
          }
          else {
            this.registerStatus = 2; // Successful registration
            this.user.userId = response.userId; // Capturing new user's username
          }
        },
        error => {this.registerStatus = 3; } // General server error
      );
    }

  }

  // Checks if registration is successful and if it is, it does does some actions like login/redirecting
  successfulRegistration(): boolean{
    if (this.registerStatus === 2  && this.passwordMatch() && !this.emptyFields() && this.attemptedRegistration === true) {
      if (this.LoggedIn === false) {
        // logs in automatically
        localStorage.clear();
        this.userService.LoginRequest(this.user.userName, this.user.password).subscribe(
          response => {
            localStorage.setItem('token', response.headers.get('Authorization'));
            localStorage.setItem('username', this.user.userName);
            // if user has asked to become a host,then a new Pending Host is posted
            if (this.user.isHost){
              this.userService.uploadPendingHost(this.user.userId);
            }
            // calls function GetUser in app.component class to update the menu panels with the new user's roles
            this.parent.GetUser();
            // if new user has uploaded a profile photo
            if (this.imageFile != null){// If the user has selected to upload an image
              // A request to upload the image to the server is made
              this.userService.UploadImage(this.user.userName, this.imageFile).subscribe(
                res => this.router.navigateByUrl('/searchForm') // After that the registration has ended, redirection to the home page
              );
            }
            if (this.imageFile == null){// If no image was selected, the user is immediately redirected to the home page
              this.router.navigateByUrl('/searchForm') ;
            }
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

  // checks registerStatus boolean to examine if the Username entered already exists
  usernameExists(): boolean{
    if (this.registerStatus === 1 && this.attemptedRegistration){
      return true;
    }
    else{
      return false;
    }
  }

  passwordMatch(): boolean {
    if (this.user.password == this.passwordVerification) { return true; }
    else { return false; }
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

  // This function takes a file, extracts its type, and returns null if the type is not acceptable as a profile photo
  private CheckImageType(file: File): string{
    let FileType = '';
    let Index: number = file.name.length;

    while (file.name.charAt(Index) !== '.' || Index < 0 ){// Iterating the filename from the end to the first '.',
                                                          // where the file type is located
      FileType = file.name.charAt(Index) + FileType;
      Index--;
    }
    FileType = file.name.charAt(Index) + FileType; // Adding a '.' to the filename

    switch (FileType) {// Checking if the file type is acceptable
      case '.png':
        return '.png';
      case '.jpg':
        return '.jpg';
      case '.jpeg':
        return '.jpeg';
      case '.gif':
        return '.gif';
      default:
        return null; // If it is not, null is returned
    }
  }

  uploadPhoto(event): void{
    this.ImageFileType = this.CheckImageType(event.target.files[0]);

    if (event.target.files[0].size > 10000000){// Maximum size of a profile photo is 10mb (Backend also programed to reject photos > 10mb)
      this.imageFile = null;
      this.ImageTooLarge = true;
      return;
    }else { this.ImageTooLarge = false; }

    if ( this.ImageFileType !== null){
      this.imageFile = event.target.files[0]; // If the file type can be accepted, the image is saved until it's uploaded to the server
      this.InvalidFileType = false;
    }else{
      this.imageFile = null;
      this.InvalidFileType = true;
    }
  }

}
