import { Component, OnInit } from '@angular/core';
import {Message} from '../../../model/Message';
import {UserService} from '../../service/user.service';
import {MessageService} from '../../service/message.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit {

  message: Message;
  ReceiverUsername: string;
  invalidReceiverId: boolean;

  constructor(private userService: UserService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.message = { messageId: null, senderId: null, receiverId: null, text: null, date: null};
    this.invalidReceiverId = false;
  }

  // This function gets the information the user has given, compiles a message accordingly and sends it
  async sendMessage() {

    this.message.receiverId = await this.userService.getUserId(this.ReceiverUsername);
    if (this.message.receiverId === -1){
      this.invalidReceiverId = true;
      return;
    }
    this.invalidReceiverId = false;

    this.message.senderId = await this.userService.getUserId(localStorage.getItem('username'));
    this.message.date = new Date();

    console.log(await this.messageService.SendMessage(this.message).toPromise());

    await this.router.navigateByUrl('/messages');

  }

  CloseComponent(): void{
    this.router.navigateByUrl('/messages');
  }
}
