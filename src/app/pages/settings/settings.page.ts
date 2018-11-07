import { Component, OnInit } from '@angular/core';
import { InkSettingsService } from '@lib/services';
import { Select, Store } from '@ngxs/store';
import {MergeSettings, UpdateSettingsItem } from '@store/actions';
import { SettingsState } from '@store/states';
import { Observable } from 'rxjs';

@Component({
  selector: 'inkapp-settings-page',
  templateUrl: './settings.page.html'
})
export class SettingsPage implements OnInit {
  @Select(SettingsState.view) view$: Observable<string>;
  currentView;
  constructor(
    private _store: Store,
    private _settingsService: InkSettingsService
  ) {}

  ngOnInit() {
    this._store.dispatch(new MergeSettings(this._settingsService.getAll()));
    this.view$.subscribe(v => (this.currentView = v));
  }

  onViewChange() {
    this._store.dispatch(new UpdateSettingsItem('view', this.currentView));
  }
}
