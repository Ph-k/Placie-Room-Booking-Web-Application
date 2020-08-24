import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from './user.service';
import {User} from '../../model/User';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdministratorGuardService implements CanActivate {

  constructor( private userService: UserService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('admin') === 'true'){
      return true;
    }

    else{
      this.router.navigate(['/searchForm']);
      return false;
    }

  }
}
