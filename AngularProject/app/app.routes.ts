import {Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {SearchFormComponent} from './search-form/search-form.component';
import {AdministratorComponent} from './administrator/administrator.component';
import {UsersComponent} from './administrator/users/users.component';
import {UserDetailsComponent} from './administrator/users/user-details/user-details.component';

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


  }
];
