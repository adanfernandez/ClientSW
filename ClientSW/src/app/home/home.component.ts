import { Component, OnInit } from '@angular/core';
import { CommonUrls } from '../shared/common-urls';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public urlPanelCreation = CommonUrls.PANEL + CommonUrls.CREATE;
  public urlPanelView = CommonUrls.PANEL + CommonUrls.VIEW;
  public urlPanelList = CommonUrls.PANEL  + CommonUrls.LIST;


  constructor() { }

  ngOnInit(): void {
  }

}
