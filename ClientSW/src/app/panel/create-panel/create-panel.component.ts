import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-panel',
  templateUrl: './create-panel.component.html',
  styleUrls: ['./create-panel.component.scss']
})
export class CreatePanelComponent implements OnInit {

  constructor() { }

  states: String[] = [];

  stateToAdd: String = "";

  ngOnInit(): void {
    this.states.push("Estado 1");
    this.states.push("Estado 2");
    this.states.push("Estado 3");
    this.states.push("Estado 4");
  }

  public addState() {
    if(this.stateToAdd) {
      this.states.push(this.stateToAdd);
    }
    this.stateToAdd = "";
  }

  public removeState(i: number) {
    this.states.splice(i,1);
  }
}
