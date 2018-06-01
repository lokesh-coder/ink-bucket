import { Component, OnInit } from '@angular/core';
import { LocalDatabase } from '../../services/localdb.service';
import { SettingsService } from '../../services/settings.service';
import { Store } from '@ngxs/store';
import merge from 'deepmerge';
import { UpdateSettings, LoadSettings } from '../../store/actions/settings.action';
import { InkAppSettings, InkAppSettingsItem } from '../../models';
import { environment } from '../../../environments/environment';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'inkapp-settings-page',
  templateUrl: './settings.component.html',
  styles: []
})
export class SettingsPage implements OnInit {
  view: InkAppSettingsItem = { key: null, value: null };
  accessUrl;
  connectedToGithub = false;
  constructor(
    private _store: Store,
    private _localDatabase: LocalDatabase,
    private _settingsService: SettingsService,
    private _githubService: GithubService
  ) {}

  ngOnInit() {
    this._settingsService.getAll().then(doc => {
      this.view = doc.filter(d => d.key === 'view')[0];
      this._store.dispatch(new LoadSettings(doc));
    });
    this.accessUrl =
      'https://github.com/login/oauth/authorize?client_id=' +
      environment.githubClientID +
      '&scope=gist&state=kjahfwxbgdcnkockibjfs';
    this.connectedToGithub = !!localStorage.getItem('inkapp_access_token');
  }
  disconnect() {}
  async uploadToGists() {
    const db = await this._localDatabase.getDatabase();
    const data = await db.dump();
    const gist = await db.settings.findOne({ key: 'gist' }).exec();
    if (gist) {
      const gistData = JSON.parse(gist.value);
      this._githubService.editGist(gistData.id, data).subscribe(a => {
        console.log('done!', a);
      });
      return;
    }
    this._githubService.createGist(data).subscribe(res => {
      this._settingsService.add('gist', JSON.stringify(res)).then(doc => {
        console.log('settings updatedw ith sync', doc);
      });
    });
  }
  async loadGists() {
    const db = await this._localDatabase.getDatabase();
    const data = await db.dump();
    this._githubService.getGist().subscribe(async (gist: any) => {
      if (!gist) {
        console.log('No gist!');
        return;
      }
      const gistData = JSON.parse(gist.files['inkapp-database.json'].content);
      await db.importDump(gistData);
    });
  }
  deleteDatabase() {
    this._localDatabase.deleteDatabase();
  }

  onViewChange(view) {
    this._settingsService.update('view', view).then(doc => {
      this._store.dispatch(new UpdateSettings('view', view));
    });
  }
}
