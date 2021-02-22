import { Component, OnInit } from '@angular/core';
import { Panel } from 'src/app/model/panel';
import { State } from 'src/app/model/state';
import { Task } from 'src/app/model/task';
import { CommonUrls } from 'src/app/shared/common-urls';


@Component({
  selector: 'app-list-panel',
  templateUrl: './list-panel.component.html',
  styleUrls: ['./list-panel.component.scss']
})
export class ListPanelComponent implements OnInit {

  panels: Panel [] = [];

  constructor() { }

  public urlPanelView = CommonUrls.PANEL + CommonUrls.VIEW;

  ngOnInit(): void {
    const task1: Task = {
      id: 0,
      title: "Task1",
      place: 0,
      expirationDate: new Date(),
      id_state: 0
    }

    const task2: Task = {
      id: 1,
      title: "Task2",
      place: 1,
      expirationDate: new Date(),
      id_state: 0
    }

    const task3: Task = {
      id: 2,
      title: "Task3",
      place: 0,
      expirationDate: new Date(),     
      id_state: 1
    }



    const state1: State= {
      id: 0,
      name: 'State 1',
      id_panel: 0,
      tasks: [task1, task2]
    }

    const state2: State= {
      id: 1,
      name: 'State 2',
      id_panel: 0,
      tasks: [task3]
    }

    const state3: State= {
      id: 2,
      name: 'State 3',
      id_panel: 0,
      tasks: []
    }

    const state4: State= {
      id: 3,
      name: 'State 4',
      id_panel: 0,
      tasks: []
    }


    const panel1 = {
      id: 0,
      name: "Diseño y lenguajes de Programación",
      id_user: 0,
      states: [state1, state2]
    }
    const panel2 = {
      id: 0,
      name: "Diseño de software",
      id_user: 0,
      states: [state1, state2, state3]
    }
    const panel3 = {
      id: 0,
      name: "Planificación de proyectos informáticos",
      id_user: 0,
      states: [state1, state4]
    }

    this.panels = [panel1, panel2, panel3];

  }
}
