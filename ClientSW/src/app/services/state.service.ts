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
    return this.http.get(`${Urls.API_GATEWAY}/panel/${id}/states`);
  }

  public deleteState(state: State) {
        return this.http.delete(`${Urls.API_GATEWAY}/state/${state.id}`);
  }

  public updateState(state: State) {
    return this.http.put(`${Urls.API_GATEWAY}/state/`, state);
  }

  public savePanel(state: State) {
    return this.http.post(`${Urls.API_GATEWAY}/state/`, state);
  }

}