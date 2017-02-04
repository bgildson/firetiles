import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';
import { Observable, Observer } from 'rxjs';


@Injectable()
export class LoginService {

  constructor(private af: AngularFire, private router: Router) {}

  login(email: string, password: string): Observable<FirebaseAuthState> {
    return Observable.create((observer: Observer<any>) => {
      this.af.auth.login({ email: email, password: password }, { provider: AuthProviders.Password, method: AuthMethods.Password })
        .then(
          (res: FirebaseAuthState) => {
            observer.next(res);
            this.router.navigate(['/']);
            observer.complete();
          },
          (err: any) => {
            observer.error(err);
          });
    });
  }

  logout() {
    // the redirect must happen on 'then' logout, because the app use 'async' pipe
    // and that just unsubscribe when 'destroy' component
    this.af.auth.logout().then(() => {
      // force app update
      this.af.auth.subscribe(() => {
        this.router.navigate(['/login']);
      });
    });
  }
}
