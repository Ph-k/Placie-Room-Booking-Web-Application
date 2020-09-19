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
import {PlaceService} from '../../service/place.service';
import {MessageService} from '../../service/message.service';

@Component({
  selector: 'app-export-data',
  templateUrl: './export-data.component.html',
  styleUrls: ['./export-data.component.css']
})
export class ExportDataComponent implements OnInit {

  constructor(private userService: UserService, private placeService: PlaceService,
              private messageService: MessageService ) { }

  fileFormat = true; // true = JSON | false = XML

  ngOnInit(): void {}

  exportUsers(): void{
    const a = document.createElement('a');
    if (this.fileFormat === true) {
      this.userService.getUsers().subscribe(users => {
        const file = new Blob([JSON.stringify(users)], {type: 'text/plain'});
        a.href = URL.createObjectURL(file);
        a.download = 'Users.json';
        a.click();
      });
    }else{
      this.userService.getUsersxml().subscribe(
        XML => {
          const file = new Blob( [XML], {type: 'application/xml'});
          a.href = URL.createObjectURL(file);
          a.download = 'Users.xml';
          a.click();
        }
      );
    }
  }

  exportPendingHosts(): void{
    const a = document.createElement('a');
    if (this.fileFormat === true) {
      this.userService.getPendingHosts().subscribe(pendingHosts => {
        const file = new Blob([JSON.stringify(pendingHosts)], {type: 'text/plain'});
        a.href = URL.createObjectURL(file);
        a.download = 'PendingHosts.json';
        a.click();
      });
    }else{
      this.userService.getPendingHostsXml().subscribe(
        XML => {
          const file = new Blob( [XML], {type: 'application/xml'});
          a.href = URL.createObjectURL(file);
          a.download = 'PendingHosts.xml';
          a.click();
        }
      );
    }
  }

  exportPlaces(): void{
    const a = document.createElement('a');
    if (this.fileFormat === true) {
      this.placeService.getPlaces().subscribe(places => {
        const file = new Blob([JSON.stringify(places)], {type: 'text/plain'});
        a.href = URL.createObjectURL(file);
        a.download = 'Places.json';
        a.click();
      });
    }else{
      this.placeService.getReservationsXml().subscribe(
        XML => {
          const file = new Blob( [XML], {type: 'application/xml'});
          a.href = URL.createObjectURL(file);
          a.download = 'Places.xml';
          a.click();
        }
      );
    }
  }

  exportReservations(): void{
    const a = document.createElement('a');
    if (this.fileFormat === true) {
      this.placeService.getReservations().subscribe(reservations => {
        const file = new Blob([JSON.stringify(reservations)], {type: 'text/plain'});
        a.href = URL.createObjectURL(file);
        a.download = 'Reservations.json';
        a.click();
      });
    }else{
      this.placeService.getReservationsXml().subscribe(
        XML => {
          const file = new Blob( [XML], {type: 'application/xml'});
          a.href = URL.createObjectURL(file);
          a.download = 'Reservations.xml';
          a.click();
        }
      );
    }
  }

  exportAvailabilities(): void{
    const a = document.createElement('a');
    if (this.fileFormat === true) {
      this.placeService.getAvailabilities().subscribe(availabilities => {
        const file = new Blob([JSON.stringify(availabilities)], {type: 'text/plain'});
        a.href = URL.createObjectURL(file);
        a.download = 'Availabilities.json';
        a.click();
      });
    }else{
      this.placeService.getAvailabilitiesXml().subscribe(
        XML => {
          const file = new Blob( [XML], {type: 'application/xml'});
          a.href = URL.createObjectURL(file);
          a.download = 'Availabilities.xml';
          a.click();
        }
      );
    }
  }

  exportReviews(): void{
    const a = document.createElement('a');
    if (this.fileFormat === true) {
      this.placeService.getReviews().subscribe( reviews => {
        const file = new Blob([JSON.stringify(reviews)], {type: 'text/plain'});
        a.href = URL.createObjectURL(file);
        a.download = 'Reviews.json';
        a.click();
      });
    }else{
      this.placeService.getReviewsXml().subscribe(
        XML => {
          const file = new Blob( [XML], {type: 'application/xml'});
          a.href = URL.createObjectURL(file);
          a.download = 'Reviews.xml';
          a.click();
        }
      );
    }
  }

  exportMessages(): void{
    const a = document.createElement('a');
    if (this.fileFormat === true) {
      this.messageService.getMessages().subscribe(messages => {
        const file = new Blob([JSON.stringify(messages)], {type: 'text/plain'});
        a.href = URL.createObjectURL(file);
        a.download = 'Messages.json';
        a.click();
      });
    }else{
      this.messageService.getMessagesXml().subscribe(
        XML => {
          const file = new Blob( [XML], {type: 'application/xml'});
          a.href = URL.createObjectURL(file);
          a.download = 'Messages.xml';
          a.click();
        }
      );
    }
  }

  exportPlacePhotos(): void{
    const a = document.createElement('a');
    if (this.fileFormat === true) {
      this.placeService.getPlacePhotos().subscribe( photos => {
        const file = new Blob([JSON.stringify(photos)], {type: 'text/plain'});
        a.href = URL.createObjectURL(file);
        a.download = 'PlacePhotos.json';
        a.click();
      });
    }else{
      this.placeService.getPlacePhotosXml().subscribe(
        XML => {
          const file = new Blob( [XML], {type: 'application/xml'});
          a.href = URL.createObjectURL(file);
          a.download = 'PlacePhotos.xml';
          a.click();
        }
      );
    }
  }
}
