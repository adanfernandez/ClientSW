import { HttpClient } from "@angular/common/http";
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

  constructor(private http: HttpClient) {}

  public login(user: User) {
      return of(user);
        //return this.http.post(Urls.API_GATEWAY + CommonUrls.LOGIN, user);
  }

  public register(user: User) {
        return this.http.post(Urls.API_GATEWAY + CommonUrls.REGISTER, user);
  }
}