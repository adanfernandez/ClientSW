import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommonUrls } from '../shared/common-urls';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";
  errMessage: string = "";

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.errMessage = "";
    this.userService.login({
      email: this.email,
      password: this.password
    }).subscribe( res => {
      localStorage.setItem("user", this.email);
      this.userService.user = {
        email: this.email
      }
      this.router.navigateByUrl(CommonUrls.HOME);
    }, err => {
      this.errMessage = "Credenciales erróneas";
    });
  }
}
