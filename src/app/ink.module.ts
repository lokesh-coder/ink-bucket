import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import {
  BucketComponent,
  BoardComponent,
  ColorFormComponent,
  ColorPickerComponent,
  InkComponent,
  NavbarComponent,
  PromptComponent,
  MagicTitleComponent
} from './components';
import { InkApp } from './ink.component';
import { RoutingModule } from './ink.routing';
import { HomePage } from './pages/home/home.component';
import { SettingsPage } from './pages/settings/settings.component';
import { SettingsState, BucketState, BoardState, InkState } from './store/states';
import { ColorModule } from './modules/color/color.module';

import { OverlayModule } from '@angular/cdk/overlay';

export const MODULES = [
  RoutingModule,
  FormsModule,
  NgxsModule.forRoot([SettingsState, BucketState, BoardState, InkState]),
  NgxsReduxDevtoolsPluginModule.forRoot(),
  ColorModule,
  OverlayModule
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
  MagicTitleComponent
];
export const PAGES = [HomePage, SettingsPage];

@NgModule({
  declarations: [...COMPONENTS, ...PAGES],
  imports: [BrowserModule, ...MODULES],
  providers: [],
  bootstrap: [InkApp]
})
export class InkModule {}
