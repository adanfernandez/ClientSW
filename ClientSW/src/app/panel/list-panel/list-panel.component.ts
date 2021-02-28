import { Component, OnInit } from '@angular/core';
import { Panel } from 'src/app/model/panel';
import { State } from 'src/app/model/state';
import { Task } from 'src/app/model/task';
import { CommonUrls } from 'src/app/shared/common-urls';
import { PanelService } from '../../services/panel.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-list-panel',
  templateUrl: './list-panel.component.html',
  styleUrls: ['./list-panel.component.scss']
})
export class ListPanelComponent implements OnInit {

  panels: Panel [] = [];

  constructor(public panelService: PanelService, public userService: UserService) { }

  public urlPanelView = CommonUrls.PANEL + CommonUrls.VIEW;

  ngOnInit(): void {
    debugger;
    this.panelService.getPanelFromUser(localStorage.getItem("id")).subscribe(
      (res: Panel[]) => {
        this.panels = res;
      }
    );
  }
}
