import { Component, ViewChild } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertMessage, AlertMessageType } from 'app/theme/components';
import { LoginService } from './login.service';

@Component({
  selector: 'login',
  template: require('./login.component.html')
})
export class LoginComponent {

  @ViewChild(AlertMessage) alertMessage: AlertMessage;

  waiting: boolean;

  form: FormGroup;
  email: AbstractControl;
  password: AbstractControl;

  constructor(private fb: FormBuilder, private loginService: LoginService) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  login() {
    this.alertMessage.close();
    if(this.form.invalid) {
      Object.keys(this.form.controls).forEach((controlName: string) => {
        this.form.controls[controlName].markAsTouched();
      });
    } else {
      this.waiting = true;
      this.loginService.login(this.email.value, this.password.value)
        .subscribe(
          () => this.waiting = false,
          (err: {code: string, message: string}) => {
            switch(err.code) {
              case 'auth/invalid-email':
              case 'auth/wrong-password':
                this.alertMessage.open('Email or user invalids!', {type: AlertMessageType.warning});
                break;
              default:
                this.alertMessage.open(err.message, {type: AlertMessageType.danger});
            }
            this.waiting = false;
          });
    }
  }

  logout() {
    this.loginService.logout();
  }
}
