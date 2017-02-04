import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { AngularFire, AngularFireAuth } from 'angularfire2';
import { Observable, Observer } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private router: Router, private af: AngularFire, private authState: AngularFireAuth) { }

  canActivate() {
    if(!this.af.auth) return Observable.of(false).first();
    return <Observable<boolean>>this.af.auth
      .map((usr) => {
        if(!usr) this.router.navigate(['/login']);
        return !!usr;
      })
      .first();
  }

  canActivateChild() {
    return this.canActivate();
  }

}
