import { Component, Input } from '@angular/core';

@Component({
  selector: 'tile-card',
  template: require('./tileCard.component.html')
})
export class TileCard {

  @Input() data: {label: string, content: string, last_update: Date};

}
