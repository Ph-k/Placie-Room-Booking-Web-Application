import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../service/message.service';
import {UserService} from '../service/user.service';
import {Observable} from 'rxjs';
import {Message} from '../../model/Message';
import setDefaultSpyStrategy = jasmine.setDefaultSpyStrategy;

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  ContactedUsers: string[];
  MessageRoomLoaded = false;
  Messages: Message[];
  private senderUsername: string;
  private UsedId: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private messageService: MessageService,
              private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserId(localStorage.getItem('username')).then(
      res => {
        this.UsedId = res;
        this.messageService.getContactedUsers(res).subscribe(users => this.ContactedUsers = users);
      }
    );
    this.MessageRoomLoaded = false;
  }

  ShowNewMessage() {
    this.router.navigate(['NewMessage'], {relativeTo: this.route});
  }

  loadMessageRoom(user: string): void {
    this.userService.getUserId(user).then(
      result => {
        this.messageService.getMessagesBetween(this.UsedId , result).subscribe(
          res => {
            this.Messages = res;
          }
        );
        this.userService.getUser(result.toString()).subscribe(
          res => {
            this.senderUsername = res.userName;
          }
        );
      }
    );
    this.MessageRoomLoaded = true;
  }

  senderName(senderId: number): string{
    if (senderId === this.UsedId){
        return 'You ';
    } else {
      return this.senderUsername;
    }
  }
}
