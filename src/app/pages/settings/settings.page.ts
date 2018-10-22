import { Component, OnInit } from '@angular/core';
import { InkGist } from '@lib/models';
import { InkDatabaseService, InkGistService, InkGithubService, InkSettingsService } from '@lib/services';
import { Select, Store } from '@ngxs/store';
import { CreateRemoteGist, FetchRemoteGist, MergeSettings, UpdateRemoteGist, UpdateSettingsItem } from '@store/actions';
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
