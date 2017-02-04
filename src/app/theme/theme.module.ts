import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from 'angularfire2';

import { AuthGuardService } from './providers';
import { CONFIG_FIREBASE } from './theme.firebase';

import {
  DisableFormControlDirective
} from './directives';

const THEME_DIRECTIVES: any[] = [
  DisableFormControlDirective
];

import {
  AlertMessage
} from './components';

const THEME_COMPONENTS: any[] = [
  AlertMessage
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(CONFIG_FIREBASE),
  ],
  providers: [
    AuthGuardService
  ],
  declarations: [
    ...THEME_DIRECTIVES,
    ...THEME_COMPONENTS
  ],
  exports: [
    ...THEME_DIRECTIVES,
    ...THEME_COMPONENTS
  ]
})
export class ThemeModule { }
