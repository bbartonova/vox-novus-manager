import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepertoarComponent } from './repertoar.component';

const routes: Routes = [{ path: '', component: RepertoarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepertoarRoutingModule { }
