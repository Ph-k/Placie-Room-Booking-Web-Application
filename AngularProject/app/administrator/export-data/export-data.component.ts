import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import {User} from '../../../model/User';
import {Place} from '../../../model/Place';
import {Reservation} from '../../../model/Reservation';
import {Availability} from '../../../model/Availability';
import {PendingHost} from '../../../model/PendingHost';
import {Review} from '../../../model/Review';
import {Message} from '../../../model/Message';
import {PlacePhoto} from '../../../model/PlacePhoto';

@Component({
  selector: 'app-export-data',
  templateUrl: './export-data.component.html',
  styleUrls: ['./export-data.component.css']
})
export class ExportDataComponent implements OnInit {

  constructor(private userService: UserService) { }

  users: User[];
  pendingHosts: PendingHost[];
  places: Place[];
  reservations: Reservation[];
  availabilities: Availability[];
  reviews: Review[];
  messages: Message[];
  placePhotos: PlacePhoto[];

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  exportUsers(): void{
    const a = document.createElement('a');
    const file = new Blob([JSON.stringify(this.users)], { type: 'text/plain' });
    a.href = URL.createObjectURL(file);
    a.download = 'Users.json';
    a.click();
  }

  exportPendingHosts(): void{
    const a = document.createElement('a');
    const file = new Blob([JSON.stringify(this.users)], { type: 'text/plain' });
    a.href = URL.createObjectURL(file);
    a.download = 'PendingHosts.json';
    a.click();
  }

  exportPlaces(): void{
    const a = document.createElement('a');
    const file = new Blob([JSON.stringify(this.users)], { type: 'text/plain' });
    a.href = URL.createObjectURL(file);
    a.download = 'Places.json';
    a.click();
  }

  exportReservations(): void{
    const a = document.createElement('a');
    const file = new Blob([JSON.stringify(this.users)], { type: 'text/plain' });
    a.href = URL.createObjectURL(file);
    a.download = 'Reservations.json';
    a.click();
  }

  exportAvailabilities(): void{
    const a = document.createElement('a');
    const file = new Blob([JSON.stringify(this.users)], { type: 'text/plain' });
    a.href = URL.createObjectURL(file);
    a.download = 'Availabilities.json';
    a.click();
  }

  exportReviews(): void{
    const a = document.createElement('a');
    const file = new Blob([JSON.stringify(this.users)], { type: 'text/plain' });
    a.href = URL.createObjectURL(file);
    a.download = 'Reviews.json';
    a.click();
  }

  exportMessages(): void{
    const a = document.createElement('a');
    const file = new Blob([JSON.stringify(this.users)], { type: 'text/plain' });
    a.href = URL.createObjectURL(file);
    a.download = 'Messages.json';
    a.click();

  }

  exportPlacePhotos(): void{

    const a = document.createElement('a');
    const file = new Blob([JSON.stringify(this.users)], { type: 'text/plain' });
    a.href = URL.createObjectURL(file);
    a.download = 'PlacePhotos.json';
    a.click();
  }
}
