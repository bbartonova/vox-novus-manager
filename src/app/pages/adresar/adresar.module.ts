import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdresarRoutingModule } from './adresar-routing.module';
import { AdresarComponent } from './adresar.component';


@NgModule({
  declarations: [
    AdresarComponent
  ],
  imports: [
    CommonModule,
    AdresarRoutingModule
  ]
})
export class AdresarModule { }
