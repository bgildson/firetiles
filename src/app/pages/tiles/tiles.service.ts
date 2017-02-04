import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';


@Injectable()
export class ResourceService {

  private _url: string;

  constructor(private af: AngularFire, url: string) {
    this._url = url;
  }

  get(key?: string, query: any = {}): FirebaseListObservable<any> {
    let url: string = this.url;
    if(key) {
      url = `${this.url}/${key}`;
    }
    return this.af.database.list(url, query);
  }

  getAsObj(key?: string, query: any = {}): Observable<any> {
    let _query: any = Object.assign(query, { preserveSnapshot: true });
    return this.get(key, _query).map((snapshots: any) => {
      let obj = {};
      snapshots.forEach((snapshot: any) => {
        obj[snapshot.key] = snapshot.val();
      });
      return obj;
    });
  }

  add(data: any): firebase.database.ThenableReference {
    return this.get().push(data);
  }

  update(key: string, data: any): firebase.Promise<void> {
    return this.get().update(key, data);
  }

  remove(key: string): firebase.Promise<void> {
    return this.get(key).remove();
  }

  get url(): string {
    return this._url;
  }
}

@Injectable()
export class TilesService extends ResourceService {
  constructor(af: AngularFire) {
    super(af, '/tiles');
  }
}
