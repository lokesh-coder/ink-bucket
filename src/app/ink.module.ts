import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BoardComponent, BucketComponent, DropComponent, HeaderComponent } from '@lib/components';
import { ActionItemElement, BillboardElement, EditableTitleElement } from '@lib/elements';
import { ColorModule } from '@lib/modules/color/color.module';
import { BoardsState, BucketsState, DropsState, SettingsState, UserState } from '@lib/store/states';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { ClipboardModule } from 'ngx-clipboard';
import { environment } from '../environments/environment';
import { InkApp } from './ink.component';
import { RoutingModule } from './ink.routing';
import { ExportPage, HomePage, NotFoundPage, RedirectPage, SettingsPage } from './pages';

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
  ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
];
export const COMPONENTS = [InkApp, HeaderComponent, BoardComponent, BucketComponent, DropComponent];
export const ELEMENTS = [ActionItemElement, EditableTitleElement, BillboardElement];
export const PAGES = [HomePage, SettingsPage, ExportPage, RedirectPage, NotFoundPage];

@NgModule({
  declarations: [...COMPONENTS, ...ELEMENTS, ...PAGES],
  imports: [...MODULES],
  bootstrap: [InkApp]
})
export class InkModule {}
