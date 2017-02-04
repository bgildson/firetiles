import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ThemeModule } from '../../theme';

import { TilesComponent } from './tiles.component';
import { TilesService } from './tiles.service';
import { TileForm, TileCard } from './components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule
  ],
  declarations: [
    TilesComponent,
    TileForm,
    TileCard
  ],
  providers: [
    TilesService
  ]
})
export class TilesModule { }
