import { Component, OnInit } from '@angular/core';
import { Panel } from 'src/app/model/panel';
import { State } from 'src/app/model/state';
import { PanelService } from '../../services/panel.service';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-create-panel',
  templateUrl: './create-panel.component.html',
  styleUrls: ['./create-panel.component.scss']
})
export class CreatePanelComponent implements OnInit {

  constructor(public panelService: PanelService, public stateService: StateService) { }

  states: string[] = [];

  title: string = "";

  stateToAdd: String = "";

  ngOnInit(): void {
  }

  /*public addState() {
    if(this.stateToAdd) {
      this.states.push(this.stateToAdd);
    }
    this.stateToAdd = "";
  }*/

  public removeState(i: number) {
    this.states.splice(i,1);
  }

  savePanel() {
    const id = localStorage.getItem("id");
    const panel: Panel = {
      userId: Number(id),
      name: this.title,
    }
    this.panelService.savePanel(panel).subscribe();
      /*res =>{
        this.states.map((state: string) => {
          const stateAdd: State = {
            name: state,

          }
          this.stateService.saveState(stateAdd).subscribe();
        })
      }
      
    );*/
  }
}
