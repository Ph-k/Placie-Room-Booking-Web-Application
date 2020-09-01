import {Component, Input, OnInit} from '@angular/core';
import {Place} from '../../../model/Place';
import {Availability} from '../../../model/Availability';
import {PlaceService} from '../../service/place.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {User} from '../../../model/User';
import {Reservation} from '../../../model/Reservation';

declare var ol: any;
@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.css']
})
export class PlaceDetailsComponent implements OnInit {

  place: Place;
  user: User;
  reservation: Reservation;
  private id: string;
  PlacePhotosIds: number[];
  placeNotFound = false;
  invalidReservation = false;

  map: any;
  feature: any;
  layer: any;
  style: any;

  constructor(private placeService: PlaceService, private userService: UserService,
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.user = {userName: '', password: '', telephone: '', firstName: '', ProfilePhoto: null, email: '', lastName: '',
      isHost: false, isTenant: false, isAdmin: false , userId: null};
    this.userService.findUserId(localStorage.getItem('username')).subscribe(response => {
      this.userService.getUser(response.toString()).subscribe(user => this.user = user);
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.placeService.getPlace(this.id).subscribe(place => {
      this.place = place;

      this.map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([ this.place.xcoordinate, this.place.ycoordinate]),
          zoom: 15
        })
      });

      this.feature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([ this.place.xcoordinate, this.place.ycoordinate]))
      });

      this.style = new ol.style.Style({
        image: new ol.style.Icon({
          scale: 0.02,
          src: '../assets/point.png'
        })
      });

      this.feature.setStyle(this.style);

      this.layer = new ol.layer.Vector({
        source: new ol.source.Vector({
          features: [
            this.feature
          ],
          style: this.style
        })
      });

      this.map.addLayer(this.layer);
    } , error => this.placeNotFound = true);
    this.placeService.GetPlacesPhotosIds(Number(this.id)).subscribe(
      Ids => this.PlacePhotosIds = Ids
    );
    this.setPlacePhotosIds();
  }

  reserve(): void {
    let checkIn: Date;
    checkIn = new Date(localStorage.getItem('startingDate'));

    let checkOut: Date;
    checkOut = new Date(localStorage.getItem('endingDate'));

    let people: number;
    people = Number(localStorage.getItem('numOfPersons'));


    this.reservation = {
      reservationId: null,
      userId: this.user.userId,
      placeId: this.place.placeId,
      startingDate: checkIn,
      endingDate: checkOut,
      numberOfPeople: people
    };

    this.placeService.makeReservation(this.reservation).subscribe(response => {
      if ( response === false ) { this.invalidReservation = true; }
      else { this.router.navigateByUrl('/searchForm'); }
      localStorage.removeItem('startingDate') ;
      localStorage.removeItem('endingDate') ;
      localStorage.removeItem('numOfPersons') ;
    });
  }

  forReservation(): boolean{
    return (this.user.isTenant && (localStorage.getItem('startingDate') != null));
  }

  setPlacePhotosIds(): void{
    this.placeService.GetPlacesPhotosIds(Number(this.id)).subscribe(
      Ids => this.PlacePhotosIds = Ids
    );
  }

  GetImageUrl(): string{
    return this.placeService.GetImageUrl(this.id);
  }

  FullsizeImage(PlacePhotosId: number): void {
    window.open(this.placeService.GetPlacePhotoUrl(PlacePhotosId));
  }

}
