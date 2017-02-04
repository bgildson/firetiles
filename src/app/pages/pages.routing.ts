import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../theme';
import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';
import { TilesComponent } from './tiles';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: PagesComponent,
    canActivateChild: [AuthGuardService],
    children: [
      {
        path: '',
        component: TilesComponent
      }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
