import { Component, OnInit } from '@angular/core';
import { InkGist } from '@lib/models';
import { InkGithubService, InkSettingsService } from '@lib/services';
import { Select, Store } from '@ngxs/store';
import {MergeSettings, UpdateSettingsItem } from '@store/actions';
import { SettingsState } from '@store/states';
import { Observable } from 'rxjs';
import { GITHUB_ACCESS_TOKEN_NAME } from '../../ink.config';

@Component({
  selector: 'inkapp-settings-page',
  templateUrl: './settings.page.html'
})
export class SettingsPage implements OnInit {
  @Select(SettingsState.view) view$: Observable<string>;
  currentView;
  userData: InkGist;
  constructor(
    private _store: Store,
    private _settingsService: InkSettingsService,
    private _githubService: InkGithubService
  ) {}

  ngOnInit() {
    this._store.dispatch(new MergeSettings(this._settingsService.getAll()));
    this.view$.subscribe(v => (this.currentView = v));
  }

  requestAuth() {
    this._githubService.requestAuth();
  }

  onViewChange() {
    this._store.dispatch(new UpdateSettingsItem('view', this.currentView));
  }
}
