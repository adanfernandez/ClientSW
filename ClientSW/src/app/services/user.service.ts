import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../model/user";
import { Urls } from './Urls-back';
import { CommonUrls } from '../shared/common-urls';
import { Observable, of } from "rxjs";
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: User;
  token: string;
  private h: Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {}

  public login(user: User) {
      //return of(user);
      return this.http.post(`${Urls.API_GATEWAY}/user/login`, user).pipe(
        map((res: any) => {
            this.guardarStorage(res.id, res.token, res);
            console.log('Token renovado');
            return true;
          }
        ), catchError( err => {
          return Observable.throw(err);
        })
      );;
  }

  public register(user: User) {
    //return of(user);  
    const headersObject = new HttpHeaders();

    return this.http.post(`${Urls.API_GATEWAY}/user/register`, user);
  }



  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
    }
  }

  guardarStorage(id: string, token: string, user: User) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  }

}