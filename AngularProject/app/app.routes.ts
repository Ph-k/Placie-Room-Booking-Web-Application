import {Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {SearchFormComponent} from './search-form/search-form.component';

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
  }
];
