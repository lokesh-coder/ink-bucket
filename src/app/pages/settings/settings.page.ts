import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import merge from 'deepmerge';
import { environment } from '../../../environments/environment';
import { InkAppSettingsItem, InkGist } from '@lib/models';
import { InkDatabaseService, InkSettingsService, InkGithubService, InkGistService } from '@lib/services';
import {
  PopulateSettings,
  UpdateSettingsItem,
  MergeSettings,
  FetchRemoteGist,
  CreateRemoteGist,
  UpdateRemoteGist
} from '@store/actions';
import { GITHUB_ACCESS_TOKEN_NAME } from '../../ink.config';
import { Observable } from 'rxjs';
import { SettingsState } from '@store/states';

@Component({
  selector: 'inkapp-settings-page',
  templateUrl: './settings.page.html'
})
export class SettingsPage implements OnInit {
  @Select(SettingsState.view) view$: Observable<string>;
  currentView;
  connectedToGithub = false;
  userData: InkGist;
  constructor(
    private _store: Store,
    private _db: InkDatabaseService,
    private _settingsService: InkSettingsService,
    private _githubService: InkGithubService,
    private _gistService: InkGistService
  ) {}

  ngOnInit() {
    this._settingsService.getAll().then(doc => {
      const user = doc.filter(s => s.key === 'gist');
      if (user.length > 0) {
        this.userData = user[0].value;
      }
      this._store.dispatch(new MergeSettings(doc));
    });
    this.view$.subscribe(v => (this.currentView = v));
    this.connectedToGithub = !!localStorage.getItem(GITHUB_ACCESS_TOKEN_NAME);
  }
  disconnect() {}
  requestAuth() {
    this._githubService.requestAuth();
  }
  async uploadToGists() {
    const db = await this._db.getDatabase();
    const data = await db.dump();
    const gist = await db.settings.findOne({ key: 'gist' }).exec();
    if (gist) {
      this._store.dispatch(new UpdateRemoteGist(gist.value.id, data)).subscribe(res => {
        console.log('hooohoo remote gist is updated!');
      });
      return;
    }
    this._store.dispatch(new CreateRemoteGist(data)).subscribe(res => {
      console.log('hooohoo remote gist ready!');
    });
  }
  async loadGists() {
    const db = await this._db.getDatabase();
    this._store.dispatch(new FetchRemoteGist()).subscribe(async gistData => {
      await db.importDump(gistData);
    });
  }
  deleteDatabase() {
    this._db.deleteDatabase();
  }

  onViewChange() {
    this._store.dispatch(new UpdateSettingsItem('view', this.currentView));
  }
}
