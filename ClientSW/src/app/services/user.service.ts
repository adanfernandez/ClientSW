import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../model/user";
import { Urls } from './Urls-back';
import { CommonUrls } from '../shared/common-urls';
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: User;
  private h: Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {}

  public login(user: User) {
      //return of(user);
      return this.http.post(`${Urls.API_GATEWAY}/user/login`, 
      user
      );
  }

  public register(user: User) {
    //return of(user);  
    const headersObject = new HttpHeaders();

    return this.http.post(`${Urls.API_GATEWAY}/user/register`, user);
  }
}