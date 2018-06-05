import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundPage, RedirectPage, ExportPage, SettingsPage, HomePage } from '@root/pages';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'settings', component: SettingsPage },
  { path: 'export', component: ExportPage },
  { path: 'redirect', component: RedirectPage },
  { path: '*', component: NotFoundPage }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}
