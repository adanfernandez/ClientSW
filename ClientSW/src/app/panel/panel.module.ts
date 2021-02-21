import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPanelComponent } from './view-panel/view-panel.component';
import { CreatePanelComponent } from './create-panel/create-panel.component';
import {  RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ListPanelComponent } from './list-panel/list-panel.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreatePanelComponent,
    pathMatch: 'full'
  },
  {
    path: 'view',
    component: ViewPanelComponent,
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ListPanelComponent,
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [ViewPanelComponent, CreatePanelComponent, ListPanelComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ],
  exports: [
    RouterModule
  ]
})
export class PanelModule { }
