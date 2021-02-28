import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../model/user";
import { Panel } from "../model/panel";
import { Urls } from './Urls-back';
import { CommonUrls } from '../shared/common-urls';
import { Task } from "../model/task";
import { State } from "../model/state";

@Injectable({
  providedIn: 'root'
})export class TaskService {

  constructor(private http: HttpClient) {}

  public getTasksByState(id) {
        return this.http.get(`${Urls.API_GATEWAY}/states/${id}/tasks`);
  }

  public deleteTask(id) {
        return this.http.delete(`${Urls.API_GATEWAY}/tasks/${id}`);
  }

  public updateTask(task: Task) {
    return this.http.put(`${Urls.API_GATEWAY}/tasks/`, task);
  }

  public saveTask(task: Task) {
    return this.http.post(`${Urls.API_GATEWAY}/tasks/`, task);
  }

}