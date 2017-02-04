import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router'
import { Observable } from 'rxjs';

import { LoginService } from './login/login.service';

@Component({
  selector: 'pages',
  template: `
  <nav class="navbar fixed-top navbar-light bg-faded tile-nav">
    <span class="navbar-brand">
      <b>Fire</b>Tiles
    </span>
    <ul class="nav navbar-nav pull-xs-right">
      <li class="nav-item">
        <a class="nav-link" href="#" (click)="loginService.logout()"><b>Logout</b></a>
      </li>
    </ul>
  </nav>
  <div class="tile-content">
    <router-outlet></router-outlet>
  </div>
  `
})
export class PagesComponent {

  constructor(private loginService: LoginService) {}

}
