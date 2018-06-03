import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { JwtModule } from '@auth0/angular-jwt';
import { ClipboardModule } from 'ngx-clipboard';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import {
  BucketComponent,
  BoardComponent,
  ColorFormComponent,
  ColorPickerComponent,
  InkComponent,
  NavbarComponent,
  PromptComponent,
  MagicTitleComponent,
  SettingsItemComponent
} from './components';
import { InkApp } from './ink.component';
import { RoutingModule } from './ink.routing';
import { HomePage } from './pages/home/home.component';
import { SettingsPage } from './pages/settings/settings.component';
import { ExportPage } from './pages/export/export.component';
import { RedirectPage } from './pages/redirect/redirect.component';
import { SettingsState, BucketState, BoardState, InkState } from './store/states';
import { ColorModule } from './modules/color/color.module';

import { OverlayModule } from '@angular/cdk/overlay';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

export function tokenGetter() {
  return localStorage.getItem('inkapp_access_token');
}

export const MODULES = [
  BrowserModule,
  RoutingModule,
  HttpClientModule,
  FormsModule,
  NgxsModule.forRoot([SettingsState, BucketState, BoardState, InkState]),
  NgxsReduxDevtoolsPluginModule.forRoot(),
  ColorModule,
  ClipboardModule,
  OverlayModule,
  JwtModule.forRoot({
    config: {
      tokenGetter: tokenGetter,
      whitelistedDomains: ['github.com']
    }
  })
];
export const COMPONENTS = [
  InkApp,
  NavbarComponent,
  BoardComponent,
  BucketComponent,
  PromptComponent,
  ColorPickerComponent,
  ColorFormComponent,
  InkComponent,
  MagicTitleComponent,
  SettingsItemComponent
];
export const PAGES = [HomePage, SettingsPage, ExportPage, RedirectPage];

@NgModule({
  declarations: [...COMPONENTS, ...PAGES, SettingsItemComponent],
  imports: [...MODULES, ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })],
  providers: [],
  bootstrap: [InkApp]
})
export class InkModule {}
