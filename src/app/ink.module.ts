import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { InkApp } from './ink.component';
import { HomePage } from './pages/home/home.component';
import { RoutingModule } from './ink.routing';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CollectionComponent } from './components/collection/collection.component';
import { BucketComponent } from './components/bucket/bucket.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { PromptComponent } from './components/prompt/prompt.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { ColorFormComponent } from './components/color-form/color-form.component';
import { InkComponent } from './components/ink/ink.component';

export const MODULES = [RoutingModule];
export const COMPONENTS = [
  InkApp,
  InkComponent,
  NavbarComponent,
  CollectionComponent,
  BucketComponent,
  SettingsComponent,
  PromptComponent,
  ColorPickerComponent,
  ColorFormComponent
];
export const PAGES = [HomePage];

@NgModule({
  declarations: [...COMPONENTS, ...PAGES],
  imports: [BrowserModule, ...MODULES],
  providers: [],
  bootstrap: [InkApp]
})
export class InkModule {}
