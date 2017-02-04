import { Component, Input, trigger, state, style, transition, animate } from '@angular/core';

import { AlertMessageType } from './alertMessage.enum';

@Component({
  selector: 'alert-message',
  template: require('./alertMessage.component.html'),
  animations: [
    trigger('openCloseAlert', [
      state('false', style({ opacity: 0, display: 'none' })),
      state('true', style({ opacity: 1 })),
      transition('* => *', [
        animate('250ms')
      ])
    ])
  ]
})
export class AlertMessage {

  private _message: string;
  private _type: string;
  private _closeButton: boolean;
  private _show: boolean = false;

  private set type(value: any) {
    switch(value) {
      case AlertMessageType.success:
        this._type = 'alert-success';
        break;
      case AlertMessageType.warning:
        this._type = 'alert-warning';
        break;
      case AlertMessageType.danger:
        this._type = 'alert-danger';
        break;
      case AlertMessageType.info:
      default:
        this._type = 'alert-info';
    }
  }

  open(message: string, config: {type?: AlertMessageType, closeButton?: boolean} = {}) {
    this._show = true;
    this._message = message;
    this.type = config.type;
    this._closeButton = config.closeButton || true;
  }

  close() {
    this._show = false;
    this._message = '';
  }

}
