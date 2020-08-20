import { Injectable } from '@angular/core';
import {User} from '../../model/User';
import {Observable} from 'rxjs';
import {Message} from '../../model/Message';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private SendMessageUrl = 'https://localhost:8443/Messages';
  constructor(private http: HttpClient) { }

  SendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.SendMessageUrl, message);
  }
}
