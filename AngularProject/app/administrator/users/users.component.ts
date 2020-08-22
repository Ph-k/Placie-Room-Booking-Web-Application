import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import {User} from '../../../model/User';
import {PendingHost} from '../../../model/PendingHost';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService ) { }

  users: User[];
  pendingHosts: PendingHost[] = [];

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
    this.userService.getPendingHosts().subscribe(pendingHosts => {this.pendingHosts = pendingHosts; });
  }

  isPendingHost(id: number): boolean{
    for (let i = 0; i < this.pendingHosts.length; i = i + 1) {
      if (this.pendingHosts[i].userId === id){
        return true;
      }
    }
    return false;
  }


}
