import { Component, OnInit } from '@angular/core';
import {Message} from '../../../model/Message';
import {UserService} from '../../service/user.service';
import {MessageService} from '../../service/message.service';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit {

  message: Message;
  ReceiverUsername: string;

  constructor(private userService: UserService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.message = { messageId: null, senderId: null, receiverId: null, text: null, date: null};
  }

  async sendMessage() {

    this.message.receiverId = await this.userService.getUserId(this.ReceiverUsername);
    this.message.senderId = await this.userService.getUserId(localStorage.getItem('username'));
    this.message.date = new Date();

    console.log('R_ID=' + this.message.receiverId);
    console.log('S_ID=' + this.message.senderId);
    console.log('Mess=' + this.message.text);
    console.log('Date=' + this.message.date);

    console.log(await this.messageService.SendMessage(this.message).toPromise());
  }
}
