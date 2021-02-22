import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Panel } from 'src/app/model/panel';
import { State } from 'src/app/model/state';
import { Task } from 'src/app/model/task';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogInputComponent } from '../../shared/dialog-input/dialog-input.component';

@Component({
  selector: 'app-view-panel',
  templateUrl: './view-panel.component.html',
  styleUrls: ['./view-panel.component.scss']
})
export class ViewPanelComponent implements OnInit {


  panel: Panel;

  deleted = [];

  constructor(public dialog: MatDialog) { }

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
      tasks: [task1, task2, task3]
    }

    const state2: State= {
      id: 1,
      name: 'State 2',
      id_panel: 0,
      tasks: []
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


    this.panel = {
      id: 0,
      name: "Panel de prueba",
      id_user: 0,
      states: [state1, state2]
    }
    this.orderTasks();
  }


  orderTasks() {
    this.panel.states.map(state => {
      state.tasks.sort((task1: Task, task2: Task) => {
        return (task1.place > task2.place) ? 1 : -1;
      });
    })
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    this.panel.states.forEach(state => {
      const idState = state.id;
      state.tasks.map(task => {
        task.id_state = idState;
        task.place = event.currentIndex;
      })
    })
    console.log(this.panel.states);
  }  


  dropRemove(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }  

  openDialogState(): void {
    const dialogRef = this.dialog.open(DialogInputComponent, {
      width: '25%',
      data: {welcomeMessage: "Añadir un estado", paramName: "Nombre del estado"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        const state: State = {
          name: result,
          tasks: []
        }
        this.panel.states.push(state);
      }
    });
  }

  openDialogTask(index: number): void {
    const dialogRef = this.dialog.open(DialogInputComponent, {
      width: '25%',
      data: {welcomeMessage: "Añadir una tarea", paramName: "Nombre de la tarea"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        const task: Task = {
          title: result,
          id_state: 0
        }
        this.panel.states[index].tasks.push(task);
      }
    });
  }


  public removeState(i: number) {
    this.panel.states.splice(i,1);
  }

  public removeTasks(i: number, event) {
    debugger;
    this.panel.states[i].tasks.splice(i,1);
  }
}