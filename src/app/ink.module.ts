import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { JwtModule } from '@auth0/angular-jwt';
import { BoardComponent, BucketComponent, DropComponent, HeaderComponent } from '@lib/components';
import { ActionItemElement, BillboardElement, EditableTitleElement, UserCardElement } from '@lib/elements';
import { ColorModule } from '@lib/modules/color/color.module';
import { BoardsState, BucketsState, DropsState, SettingsState, UserState } from '@lib/store/states';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { ClipboardModule } from 'ngx-clipboard';
import { environment } from '../environments/environment';
import { InkApp } from './ink.component';
import { GITHUB_ACCESS_TOKEN_NAME } from './ink.config';
import { RoutingModule } from './ink.routing';
import { ExportPage, HomePage, NotFoundPage, RedirectPage, SettingsPage } from './pages';

export function tokenGetter() {
  return localStorage.getItem(GITHUB_ACCESS_TOKEN_NAME);
}

export const MODULES = [
  BrowserModule,
  RoutingModule,
  HttpClientModule,
  FormsModule,
  AngularFireModule.initializeApp(environment.firebase),
  AngularFireAuthModule,
  AngularFirestoreModule,
  NgxsModule.forRoot([UserState, SettingsState, BoardsState, BucketsState, DropsState]),
  NgxsReduxDevtoolsPluginModule.forRoot(),
  ColorModule,
  ClipboardModule,
  OverlayModule,
  ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
  JwtModule.forRoot({
    config: {
      tokenGetter: tokenGetter,
      whitelistedDomains: ['api.github.com']
    }
  })
];
export const COMPONENTS = [InkApp, HeaderComponent, BoardComponent, BucketComponent, DropComponent];
export const ELEMENTS = [ActionItemElement, EditableTitleElement, UserCardElement, BillboardElement];
export const PAGES = [HomePage, SettingsPage, ExportPage, RedirectPage, NotFoundPage];

@NgModule({
  declarations: [...COMPONENTS, ...ELEMENTS, ...PAGES],
  imports: [...MODULES],
  bootstrap: [InkApp]
})
export class InkModule {}
