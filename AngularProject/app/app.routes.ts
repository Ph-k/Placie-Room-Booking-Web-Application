import {Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {SearchFormComponent} from './search-form/search-form.component';
import {AdministratorComponent} from './administrator/administrator.component';
import {UsersComponent} from './administrator/users/users.component';
import {UserDetailsComponent} from './administrator/users/user-details/user-details.component';
import {MessagesComponent} from './messages/messages.component';
import {NewMessageComponent} from './messages/new-message/new-message.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {ExportDataComponent} from './administrator/export-data/export-data.component';
import {AdministratorGuardService} from './service/administrator-guard.service';
import {UserGuardService} from './service/user-guard.service';
import {HostComponent} from './host/host.component';
import {PlacesComponent} from './host/places/places.component';
import {NewPlaceComponent} from './host/new-place/new-place.component';
import {EditPlaceComponent} from './host/places/edit-place/edit-place.component';
import {HostGuardService} from './service/host-guard.service';
import {AllPlacesComponent} from './all-places/all-places.component';
import {PlaceDetailsComponent} from './all-places/place-details/place-details.component';

export const SiteRoutes: Routes = [
  {
    path: '',
    redirectTo: '/searchForm',
    pathMatch: 'full'
  },
  {
    path: 'searchForm',
    component: SearchFormComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'administrator',
    component: AdministratorComponent,
    canActivate: [AdministratorGuardService]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AdministratorGuardService]
  },
  {
    path: 'exportData',
    component: ExportDataComponent,
    canActivate: [AdministratorGuardService]
  },
  {
    path: 'users/:id',
    component: UserDetailsComponent
  },
  {
    path: 'host',
    component: HostComponent,
    canActivate: [HostGuardService]
  },
  {
    path: 'myPlaces',
    component: PlacesComponent,
    canActivate: [HostGuardService]
  },
  {
    path: 'newPlace',
    component: NewPlaceComponent,
    canActivate: [HostGuardService]
  },
  {
    path: 'editPlaces/:id',
    component: EditPlaceComponent,
    canActivate: [HostGuardService]
  }
  ,
  {
    path: 'editAccount',
    component: UserEditComponent,
    canActivate: [UserGuardService]
  },
  {
    path: 'messages',
    component: MessagesComponent,
    canActivate: [UserGuardService],
    children: [
      {
        path: 'NewMessage',
        component: NewMessageComponent,
        canActivate: [UserGuardService]
      }]

  },
  {
    path: 'places',
    component: AllPlacesComponent
  }
  ,
  {
    path: 'places/:id',
    component: PlaceDetailsComponent
  }
];
