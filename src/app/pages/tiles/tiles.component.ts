import { Component, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';

import { TileForm } from './components';
import { LoginService } from '../login/login.service';
import { TilesService } from './tiles.service';


@Component({
  selector: 'tiles',
  template: require('./tiles.component.html')
})
export class TilesComponent implements AfterViewInit {

  tiles: FirebaseListObservable<any>;

  @ViewChild(TileForm) tileForm: TileForm;

  constructor(public tilesService: TilesService) { }

  ngAfterViewInit() {
    this.tiles = this.tilesService.get();
  }
}
