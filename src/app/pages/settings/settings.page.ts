import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import merge from 'deepmerge';
import { environment } from '../../../environments/environment';
import { InkAppSettingsItem, InkGist } from '@lib/models';
import { InkDatabaseService, InkSettingsService, InkGithubService, InkGistService } from '@lib/services';
import { PopulateSettings, UpdateSettingsItem } from '@store/actions';
import { GITHUB_ACCESS_TOKEN_NAME } from '../../ink.config';

@Component({
  selector: 'inkapp-settings-page',
  templateUrl: './settings.page.html',
  styles: []
})
export class SettingsPage implements OnInit {
  view: InkAppSettingsItem = { key: null, value: null };
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
      console.log('user data', doc);
      const user = doc.filter(s => s.key === 'gist');
      if (user) {
        this.userData = JSON.parse(user[0].value);
      }
      this.view = doc.filter(d => d.key === 'view')[0];
      this._store.dispatch(new PopulateSettings(doc));
    });
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
      const gistData = JSON.parse(gist.value);
      this._gistService.edit(gistData.id, data).subscribe(
        res => {
          console.log('done!', res);
          this._settingsService.update('gist', JSON.stringify(res)).then(doc => {
            console.log('settings updatedw ith sync', doc);
          });
        },
        err => {
          console.log('something went wrong', err);
        }
      );
      return;
    }
    this._gistService.create(data).subscribe(res => {
      this._settingsService.add('gist', JSON.stringify(res)).then(doc => {
        console.log('settings updatedw ith sync', doc);
      });
    });
  }
  async loadGists() {
    const db = await this._db.getDatabase();
    const data = await db.dump();
    this._gistService.get().subscribe(async (gist: any) => {
      if (!gist) {
        console.log('No gist!');
        return;
      }
      const gistData = JSON.parse(gist.files['inkapp-database.json'].content);
      await db.importDump(gistData);
    });
  }
  deleteDatabase() {
    this._db.deleteDatabase();
  }

  onViewChange(view) {
    this._settingsService.update('view', view).then(doc => {
      this._store.dispatch(new UpdateSettingsItem('view', view));
    });
  }
}
