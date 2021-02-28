import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Panel } from 'src/app/model/panel';
import { State } from 'src/app/model/state';
import { Task } from 'src/app/model/task';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogInputComponent } from '../../shared/dialog-input/dialog-input.component';
import { ActivatedRoute } from '@angular/router';
import { PanelService } from '../../services/panel.service';
import { StateService } from '../../services/state.service';
import { tap, map } from 'rxjs/operators';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-view-panel',
  templateUrl: './view-panel.component.html',
  styleUrls: ['./view-panel.component.scss']
})
export class ViewPanelComponent implements OnInit {


  panel: Panel;

  tasksDeleted = [];
  statesDeleted = [];

  constructor(public dialog: MatDialog, private activatedRoute: ActivatedRoute, private panelService: PanelService, private stateService: StateService, private taskService: TaskService) { 
    console.log("A");
  }

  ngOnInit(): void {
    debugger;
    const id = this.activatedRoute.snapshot.params.id;
    this.panel = {
      id: id,
      states: []
    }
    this.loadDataFromPanel(id);
  }


  loadDataFromPanel(id) {
    this.stateService
      .getStatesByPanel(id).pipe(
      tap(
        (states: State[]) => {
          states.map((state: State) => {
            this.taskService.getTasksByState(state.id).subscribe(
              (tasks: Task[]) => {
                state.tasks = tasks;
                this.panel.states.push(state);
              });
          })
        }
      )
      ).subscribe();
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
    console.log(event.container.data[0]['id']);
    this.deleteTask(event.container.data[0]['id']);
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

  saveTask(task: Task) {
    this.taskService.saveTask(task).subscribe();
  }

  deleteTask(task) {
    this.taskService.deleteTask(task).subscribe();
  }

  saveState(state: State) {
    this.stateService.saveState(state).subscribe();
  }

  deleteState(id) {
    this.stateService.deleteState(id).subscribe();
  }




}