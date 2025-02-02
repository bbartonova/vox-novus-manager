import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UcastRoutingModule } from './ucast-routing.module';
import { UcastComponent } from './ucast.component';


@NgModule({
  declarations: [
    UcastComponent
  ],
  imports: [
    CommonModule,
    UcastRoutingModule
  ]
})
export class UcastModule { }
