import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KoncertyComponent } from './koncerty.component';

const routes: Routes = [{ path: '', component: KoncertyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KoncertyRoutingModule { }
