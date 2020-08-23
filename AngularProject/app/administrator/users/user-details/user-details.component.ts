import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../service/user.service';
import {User} from '../../../../model/User';
import {ActivatedRoute} from '@angular/router';
import {PendingHost} from '../../../../model/PendingHost';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: User;
  pendingHost: PendingHost;
  userExists = true;
  private id = this.route.snapshot.paramMap.get('id');
  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userService.getUser(this.id).subscribe(user => {this.user = user; if (user == null){this.userExists = false; }});
    this.userService.getPendingHost(this.id).subscribe(pendingHost => this.pendingHost = pendingHost, error => this.pendingHost = null);


  }

  isPendingHost(): boolean{
    if (this.pendingHost != null && !this.user.isHost){
      return true;
    }
    else {
      return false;
    }
  }

  verifyHost(): void{
    this.user.isHost = true;
    this.userService.updateUser( this.user , this.user.userId);
    this.userService.deletePendingHost(this.user.userId);
  }

  GetImageUrl(): string{
    return this.userService.GetImageUrl(this.user.userName);
  }
}
