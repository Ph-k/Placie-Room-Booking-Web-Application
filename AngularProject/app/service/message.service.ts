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
  private MessagesUrl = 'https://localhost:8443';
  constructor(private http: HttpClient) { }

  SendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.SendMessageUrl, message);
  }

  getContactedUsers(userID: number): Observable<string[]>{
    return this.http.get<string[]>(this.MessagesUrl + '/ContactedUsers/' + userID);
  }

  getMessagesBetween(userID1: number, userID2: number): Observable<Message[]>{
    return this.http.get<Message[]>(this.MessagesUrl + '/MessagesBetween/' + userID1 + '/' + userID2);
  }

}
