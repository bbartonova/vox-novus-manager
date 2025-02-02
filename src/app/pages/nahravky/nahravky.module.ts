import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NahravkyRoutingModule } from './nahravky-routing.module';
import { NahravkyComponent } from './nahravky.component';


@NgModule({
  declarations: [
    NahravkyComponent
  ],
  imports: [
    CommonModule,
    NahravkyRoutingModule
  ]
})
export class NahravkyModule { }
