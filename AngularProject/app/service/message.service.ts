import { Injectable } from '@angular/core';
import {User} from '../../model/User';
import {Observable} from 'rxjs';
import {Message} from '../../model/Message';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private SendMessageUrl = 'https://localhost:8443/Messages';
  private MessagesUrl = 'https://localhost:8443';
  private authorizationHeader: { headers: { Authorization: string } } ;

  constructor(private http: HttpClient) {
    this.authorizationHeader = { headers: {Authorization: localStorage.getItem('token') }  };
  }

  getMessages(): Observable<Message[]>{
    return this.http.get<Message[]>(this.SendMessageUrl, this.authorizationHeader);
  }

  getMessagesXml(): Observable<string>{
    const httpHeader: HttpHeaders = new HttpHeaders({
      Accept: 'application/xml',
      Authorization: localStorage.getItem('token')
    });
    return this.http.get(this.SendMessageUrl, { headers: httpHeader , responseType: 'text'});
  }

  SendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.SendMessageUrl, message, this.authorizationHeader);
  }

  deleteMessage(messageId: number): void{
    this.http.delete<Message>(this.SendMessageUrl + '/' + messageId, this.authorizationHeader).subscribe();
  }

  getContactedUsers(userID: number): Observable<string[]>{
    return this.http.get<string[]>(this.MessagesUrl + '/ContactedUsers/' + userID, this.authorizationHeader);
  }

  getMessagesBetween(userID1: number, userID2: number): Observable<Message[]>{
    return this.http.get<Message[]>(this.MessagesUrl + '/MessagesBetween/' + userID1 + '/' + userID2, this.authorizationHeader);
  }

}
