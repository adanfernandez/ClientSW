import { Component, OnInit } from '@angular/core';
import { CommonUrls } from '../shared/common-urls';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  urlHome: string = CommonUrls.HOME;

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.userService.user = null;
    this.router.navigateByUrl("/login");
  }

}
