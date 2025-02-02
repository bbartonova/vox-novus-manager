import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdresarComponent } from './adresar.component';

const routes: Routes = [{ path: '', component: AdresarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdresarRoutingModule { }
