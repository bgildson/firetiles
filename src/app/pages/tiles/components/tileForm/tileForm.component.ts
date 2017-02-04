import { Component, ViewChild, trigger, state, style, transition, animate } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AlertMessage, AlertMessageType } from 'app/theme/components';
import { TilesService } from '../../tiles.service';


@Component({
  selector: 'tile-form',
  styleUrls: ['./tileForm.component.scss'],
  template: require('./tileForm.component.html'),
  animations: [
    trigger('backState', [
      state('false', style({ opacity: 0, display: 'none' })),
      state('true', style({ opacity: 0.5 })),
      transition('* => *', [
        animate('250ms')
      ])
    ]),
    trigger('formTile', [
      state('false', style({ transform: 'translateX(0)', display: 'none' })),
      state('true', style({ transform: 'translateX(-100%)' })),
      transition('* => *', [
        animate('250ms')
      ])
    ])
  ]
})
export class TileForm {

  @ViewChild(AlertMessage) alertMessage: AlertMessage;

  private _show: boolean = false;
  private _waiting: boolean = false;
  private _key: string = '';

  form: FormGroup;
  label: AbstractControl;
  content: AbstractControl;

  constructor(private fb: FormBuilder, private tilesService: TilesService) {
    this.form = this.fb.group({
      'label': '',
      'content': ''
    });

    this.label = this.form.controls['label'];
    this.content = this.form.controls['content'];
  }

  open() {
    this._show = true;
    this._reset();
  }

  close() {
    if(!this._waiting) {
      this._show = false;
      this.alertMessage.close();
    }
  }

  add() {
    this.open();
    this._key = '';
    this._waiting = false;
  }

  edit(key: any) {
    this.open();
    this._waiting = true;
    this._key = key;
    this.tilesService.getAsObj(this._key).first().subscribe(
      (tile: any) => {
        this.form.patchValue(tile);
        this._waiting = false;
      });
  }

  private _save() {
    this._waiting = true;
    let callbackError: (a: Error) => any = (err: Error) => {
      this.alertMessage.open(err.message, { type: AlertMessageType.danger });
      this._waiting = false;
    }
    if (this._key) {
      this.tilesService.update(this._key, this.form.value)
        .then((data: any) => {
          this.alertMessage.open('Tile updated!', { type: AlertMessageType.success });
          this._waiting = false;
        })
        .catch(callbackError);
    } else {
      this.tilesService.add(this.form.value)
        .then((data: any) => {
          this.alertMessage.open('Tile added!', { type: AlertMessageType.success });
          this._key = data.key;
          this._waiting = false;
        })
        .catch(callbackError);
    }
  }

  private _remove() {
    this._waiting = true;
    this.tilesService.remove(this._key)
      .then(() => {
        this.alertMessage.open('Item removed!', { type: AlertMessageType.success });
        this._reset();
        this._waiting = false;
      })
      .catch((err: any) => {
        this.alertMessage.open(err, { type: AlertMessageType.danger });
      });
  }

  private _reset() {
    this.form.reset();
    this._key = '';
  }
}
