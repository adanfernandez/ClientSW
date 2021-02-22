import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../model/user";
import { Panel } from "../model/panel";
import { Urls } from './Urls-back';
import { CommonUrls } from '../shared/common-urls';
import { Task } from "../model/task";
import { State } from "../model/state";

@Injectable()
export class TaskService {

  constructor(private http: HttpClient) {}

  public getTasksByState(state: State) {
    return this.http.get(Urls.API_GATEWAY + CommonUrls.PANEL + CommonUrls.TASK + state.id);
  }

  public deleteTask(task: Task) {
        return this.http.delete(Urls.API_GATEWAY + CommonUrls.TASK + task.id);
  }

  public updateTask(task: Task) {
    return this.http.put(Urls.API_GATEWAY + CommonUrls.TASK,  task);
  }

  public saveTask(task: Task) {
    return this.http.post(Urls.API_GATEWAY + CommonUrls.TASK,  task);
  }

}