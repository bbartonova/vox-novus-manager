import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule
import { RouterModule } from '@angular/router';
import { KoncertyComponent } from './koncerty.component';

@NgModule({
  declarations: [KoncertyComponent],
  imports: [
    CommonModule,
    FormsModule, // ✅ Přidáno FormsModule pro [(ngModel)]
    RouterModule.forChild([{ path: '', component: KoncertyComponent }]),
  ],
})
export class KoncertyModule {}
