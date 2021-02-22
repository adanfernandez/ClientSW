import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../model/user";
import { Panel } from "../model/panel";
import { Urls } from './Urls-back';
import { CommonUrls } from '../shared/common-urls';
import { State } from "../model/state";

@Injectable()
export class StateService {

  constructor(private http: HttpClient) {}

  public getStatesByPanel(panel: Panel) {
    return this.http.get(Urls.API_GATEWAY + CommonUrls.PANEL + CommonUrls.STATE + panel.id);
  }

  public deleteState(state: State) {
        return this.http.delete(Urls.API_GATEWAY + CommonUrls.STATE + state.id);
  }

  public updateState(state: State) {
    return this.http.put(Urls.API_GATEWAY + CommonUrls.STATE,  state);
  }

  public savePanel(state: State) {
    return this.http.post(Urls.API_GATEWAY + CommonUrls.STATE,  state);
  }

}