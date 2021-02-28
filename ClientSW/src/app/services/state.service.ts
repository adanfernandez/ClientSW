import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../model/user";
import { Panel } from "../model/panel";
import { Urls } from './Urls-back';
import { CommonUrls } from '../shared/common-urls';
import { State } from "../model/state";

@Injectable({
  providedIn: 'root'
})export class StateService {

  constructor(private http: HttpClient) {}

  public getStatesByPanel(id) {
    return this.http.get(`${Urls.API_GATEWAY}/panels/${id}/states`);
  }

  public deleteState(state: State) {
        return this.http.delete(`${Urls.API_GATEWAY}/states/${state.id}`);
  }

  public updateState(state: State) {
    return this.http.put(`${Urls.API_GATEWAY}/states/`, state);
  }

  public saveState(state: State) {
    return this.http.post(`${Urls.API_GATEWAY}/states/`, state);
  }

}