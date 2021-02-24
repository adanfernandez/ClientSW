import { Component, OnInit } from '@angular/core';
import { CommonUrls } from '../shared/common-urls';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  urlHome: string = CommonUrls.HOME;

  constructor() { }

  ngOnInit(): void {
  }

}
