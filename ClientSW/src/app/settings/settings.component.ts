import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommonUrls } from '../shared/common-urls';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  email: string = "";
  name: string = "";
  surname: string = "";
  phone: string = "";
  repPassword: string = "";
  password: string = "";
  errMessage: string = "";

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  public saveChanges() {
    if(this.checkData()) {
      this.errMessage = "";
      this.userService.register({
         email: this.email,
         password: this.password,
         phone: this.phone,
         name: this.name,
         surname: this.surname
       }).subscribe( res => {
         localStorage.setItem("user", this.email);
         this.userService.user = {
           email: this.email
         }
         this.router.navigateByUrl(CommonUrls.HOME);
       }, err => {
         this.errMessage = "Datos incorrectos";
       });
    }
  }

  checkData() {
    if(this.password != this.repPassword) {
      this.errMessage = "Las contraseñas no coinciden";
      return false;
    } else if(!this.name || !this.surname || !this.phone || !this.email) {
      this.errMessage = "Hay que completar todos los datos";
      return false;
    }
    return true;
  }

}
