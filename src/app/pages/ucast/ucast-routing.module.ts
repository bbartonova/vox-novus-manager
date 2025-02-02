import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UcastComponent } from './ucast.component';

const routes: Routes = [{ path: '', component: UcastComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UcastRoutingModule { }
