import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from 'angularfire2';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { PagesModule } from './pages';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    // 
    PagesModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
