import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepertoarRoutingModule } from './repertoar-routing.module';
import { RepertoarComponent } from './repertoar.component';


@NgModule({
  declarations: [
    RepertoarComponent
  ],
  imports: [
    CommonModule,
    RepertoarRoutingModule
  ]
})
export class RepertoarModule { }
