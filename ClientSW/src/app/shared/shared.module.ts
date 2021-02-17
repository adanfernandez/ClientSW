import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GuardsComponent } from './guards/guards.component';

/* IMPORTS MATERIAL*/


@NgModule({
  declarations: [GuardsComponent],
  imports: [
    CommonModule
  ],
  exports: [
    FormsModule,
  ]
})
export class SharedModule { }
