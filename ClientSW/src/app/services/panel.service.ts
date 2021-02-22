import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../model/user";
import { Panel } from "../model/panel";
import { Urls } from './Urls-back';
import { CommonUrls } from '../shared/common-urls';

@Injectable()
export class PanelService {

  constructor(private http: HttpClient) {}

  public getPanelFromUser(user: User) {
        return this.http.get(Urls.API_GATEWAY + CommonUrls.PANEL + CommonUrls.LIST + user.id);
  }

  public deletePanel(panel: Panel) {
        return this.http.delete(Urls.API_GATEWAY + CommonUrls.PANEL + panel.id);
  }

  public updatePanel(panel: Panel) {
    return this.http.put(Urls.API_GATEWAY + CommonUrls.PANEL,  panel);
  }

  public savePanel(panel: Panel) {
    return this.http.post(Urls.API_GATEWAY + CommonUrls.PANEL,  panel);
  }
}