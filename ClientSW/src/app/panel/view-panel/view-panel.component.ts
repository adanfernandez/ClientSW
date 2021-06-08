import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit } from '@angular/core';
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
                state.tasks.map(task => {
                  task.saved = true;
                });
                this.panel.states.push(state);
                this.panel.states = this.panel.states.sort((state1, state2) => state1.id - state2.id);
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


  drop(event: CdkDragDrop<string[]>, id) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    if(event.container.data[event.currentIndex]['stateId'] != id) {
      event.container.data[event.currentIndex]['stateId'] = id;
      console.log(event.container.data[event.currentIndex]);
      this.updateTask( event.container.data[event.currentIndex]);
    }
  }  

  updateTask(task) {
    this.taskService.updateTask(task).subscribe( res => {
      task.saved = true;
    });
  }

  updateDateOfTask(task: Task) {
    let date = document.getElementById(`date-${task.id}`);
    let time = document.getElementById(`time-${task.id}`);

    if(date) {
      const fecha = (<HTMLInputElement>date).value.split('-');
      const hora = (<HTMLInputElement>time).value.split(':');
  
      const da = new Date();
      da.setFullYear(Number(fecha[0]));
      da.setMonth(Number(fecha[1])-1);
      da.setDate(Number(fecha[2]));
  
      da.setHours(Number(hora[0]));
      da.setMinutes(Number(hora[1]));
      task.expirationDate = da;
    }
    
    this.taskService.updateTask(task).subscribe(res =>{
      task.saved = true;
    });
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
    console.log(event.container.data[0]);
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
          place: this.panel.states.length,
          tasks: [],
          panelId: this.panel.id
        }
        this.saveState(state);
        this.loadDataFromPanel(this.panel.id);
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
          stateId: this.panel.states[index].id
        }
        this.saveTask(task).subscribe(res => {
          this.taskService.getTasksByState(index).subscribe((tasks: Task[]) => {
            this.panel.states[index].tasks = tasks;
          });
        });
      }
    });
  }

  saveTask(task: Task) {
    return this.taskService.saveTask(task);
  }

  deleteTask(task) {
    this.taskService.deleteTask(task).subscribe();
  }

  saveState(state: State) {
    this.stateService.saveState(state).subscribe(res =>{
      const id = this.activatedRoute.snapshot.params.id;
      this.panel = {
        id: id,
        states: []
      }
      this.loadDataFromPanel(id);
    }      
    );
  }

  deleteState(state, i) {
    this.panel.states.splice(i,1);
    this.stateService.deleteState(state).subscribe();
  }

  getTimeByTimeStamp(timestamp) {
    const date: Date = new Date(timestamp);
    const month = date.getMonth() > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
    const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
    const fecha = `${date.getFullYear()}-${month}-${day}`;

    const hours = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
    const minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
    const time = `${hours}:${minutes}`;

    return [fecha, time];
  }

  

  addOrRemoveDateToTask(task: Task) {
    if(task.expirationDate) {
      task.expirationDate = null;
    } else {
      const fecha = new Date();
      fecha.setDate(fecha.getDate() + 1);
      task.expirationDate = fecha;
    }
  }


}