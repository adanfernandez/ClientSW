import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';


@NgModule({
  declarations: [RegisterComponent],
  providers: [],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, RegisterRoutingModule],
  exports: [RegisterComponent]
})
export class RegisterModule {}
