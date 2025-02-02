import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NahravkyComponent } from './nahravky.component';

const routes: Routes = [{ path: '', component: NahravkyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NahravkyRoutingModule { }
