import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import {
  BucketComponent,
  CollectionComponent,
  ColorFormComponent,
  ColorPickerComponent,
  InkComponent,
  NavbarComponent,
  PromptComponent
} from './components';
import { InkApp } from './ink.component';
import { RoutingModule } from './ink.routing';
import { HomePage } from './pages/home/home.component';
import { SettingsPage } from './pages/settings/settings.component';
import { SettingsState } from './store/states/settings.state';

export const MODULES = [RoutingModule, NgxsModule.forRoot([SettingsState]), NgxsReduxDevtoolsPluginModule.forRoot()];
export const COMPONENTS = [
  InkApp,
  NavbarComponent,
  CollectionComponent,
  BucketComponent,
  PromptComponent,
  ColorPickerComponent,
  ColorFormComponent,
  InkComponent
];
export const PAGES = [HomePage, SettingsPage];

@NgModule({
  declarations: [...COMPONENTS, ...PAGES],
  imports: [BrowserModule, ...MODULES],
  providers: [],
  bootstrap: [InkApp]
})
export class InkModule {}
