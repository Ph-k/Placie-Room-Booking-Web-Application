import {Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {SearchFormComponent} from './search-form/search-form.component';
import {AdministratorComponent} from './administrator/administrator.component';
import {UsersComponent} from './administrator/users/users.component';
import {UserDetailsComponent} from './administrator/users/user-details/user-details.component';
import {MessagesComponent} from './messages/messages.component';
import {NewMessageComponent} from './messages/new-message/new-message.component';

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
    children: [
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'users/:id',
        component: UserDetailsComponent,
      }]


  },
  {
    path: 'messages',
    component: MessagesComponent,
    children: [
      {
        path: 'NewMessage',
        component: NewMessageComponent,
      }]
  }
];
