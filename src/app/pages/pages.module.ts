import { NgModule } from '@angular/core';

import { ThemeModule } from '../theme';

import { PagesComponent } from './pages.component';

import { routing } from './pages.routing';
import { LoginModule } from './login';
import { TilesModule } from './tiles';

@NgModule({
  imports: [
    ThemeModule,
    // 
    routing,
    LoginModule,
    TilesModule
  ],
  declarations: [
    PagesComponent
  ],
  exports: [
    PagesComponent
  ]
})
export class PagesModule {}
