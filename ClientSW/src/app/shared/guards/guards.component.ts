import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';


@Injectable({
  providedIn: 'root'
})
export class GuardsComponent implements  CanActivate {

  constructor(private router: Router, private userService: UserService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!localStorage.getItem("id")) {
      if(route.routeConfig.path === 'login' || route.routeConfig.path === 'register') {
        return true;
      }
      this.router.navigateByUrl('/login');
      return false;
    } else {
      if(route.routeConfig.path === 'login' || route.routeConfig.path === 'register') {
        this.router.navigateByUrl('/home');
        return false;
      }
      return true;
    }
  }
}