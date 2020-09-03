import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {User} from '../../model/User';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User;
  id: number;
  attemptedPasswordChange = false;
  attemptedDetailsChange = false;
  password: string;
  passwordVerification: string;
  isPendingHost = false;
  imageFile: File;
  private ImageFileType: string;
  InvalidFileType = false;
  ImageTooLarge = false;
  alreadyHost = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = {userName: null, password: '', telephone: '', firstName: '', ProfilePhoto: null, email: '', lastName: '',
      isHost: false, isTenant: false, isAdmin: false , userId: null};
    this.userService.findUserId(localStorage.getItem('username')).
    subscribe(response => { this.id =  response; this.userService.getUser(response.toString()).
    subscribe(user => {this.user = user; this.alreadyHost = user.isHost; });
                            this.userService.getPendingHost(this.id.toString()).subscribe(pendingHost => this.isPendingHost = true,
          error => this.isPendingHost = false); });
    }


  changeDetails(): void{
    this.attemptedDetailsChange = true;
    if (this.user.isHost && !this.alreadyHost){
      this.userService.uploadPendingHost(this.id);
    }
    this.userService.updateUser(this.user, this.id );
  }

  changePassword(): void{
    this.attemptedPasswordChange = true;
    if (this.passwordMatch() && !this.smallPassword()){
      this.user.password = this.password;
      this.userService.updateUserPassword(this.user, this.id );
    }
  }

  passwordMatch(): boolean {
    if (this.password == this.passwordVerification) {return true; }
    else {return false; }
  }

  smallPassword(): boolean {
    return this.attemptedPasswordChange && this.password.length < 4;
  }

  GetImageUrl(): string{
    if (this.user.userName == null) { return null; }
    return this.userService.GetImageUrl(this.user.userName);
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

  updatePhoto(event): void{
    this.ImageFileType = this.CheckImageType(event.target.files[0]);

    if (event.target.files[0].size > 10000000){
      this.imageFile = null;
      this.ImageTooLarge = true;
      return;
    }else { this.ImageTooLarge = false; }

    if ( this.ImageFileType !== null){
      this.imageFile = event.target.files[0];
      this.InvalidFileType = false;
      this.userService.UploadImage(this.user.userName, this.imageFile);
      window.location.reload();
    }else{
      this.imageFile = null;
      this.InvalidFileType = true;
    }
  }

}
