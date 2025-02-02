import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent, // Layout, který obsahuje společné menu
    children: [
      { path: '', component: DashboardComponent }, // Výchozí stránka dashboardu
      {
        path: 'adresar',
        loadChildren: () =>
          import('../adresar/adresar.module').then((m) => m.AdresarModule),
      },
      {
        path: 'koncerty',
        loadChildren: () =>
          import('../koncerty/koncerty.module').then((m) => m.KoncertyModule),
      },
      {
        path: 'ucast',
        loadChildren: () =>
          import('../ucast/ucast.module').then((m) => m.UcastModule),
      },
      {
        path: 'repertoar',
        loadChildren: () =>
          import('../repertoar/repertoar.module').then(
            (m) => m.RepertoarModule
          ),
      },
      {
        path: 'nahravky',
        loadChildren: () =>
          import('../nahravky/nahravky.module').then((m) => m.NahravkyModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
