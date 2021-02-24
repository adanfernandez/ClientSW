import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommonUrls } from '../shared/common-urls';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  email: string = "";
  name: string = "";
  surname: string = "";
  phone: string = "";
  repPassword: string = "";
  password: string = "";
  errMessage: string = "";


  constructor(private userService: UserService, private router: Router) { }

  public urlLogin = CommonUrls.LOGIN;

  ngOnInit(): void {
  }

  public register() {
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
         this.router.navigateByUrl(CommonUrls.LOGIN);
       }, err => {
         this.errMessage = "Datos incorrectos";
       });
    }
  }

  checkData() {
    debugger;
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
