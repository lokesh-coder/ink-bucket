import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './pages/home/home.component';
import { SettingsPage } from './pages/settings/settings.component';
import { ExportPage } from './pages/export/export.component';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'settings', component: SettingsPage },
  { path: 'export', component: ExportPage }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}

export const routedComponents = [HomePage];
