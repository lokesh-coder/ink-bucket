import { Component, OnInit } from '@angular/core';
import { LocalDatabase } from '../../services/localdb.service';
import { SettingsService } from '../../services/settings.service';
import { Store } from '@ngxs/store';
import { UpdateSettings, LoadSettings } from '../../store/actions/settings.action';
import { InkAppSettings, InkAppSettingsItem } from '../../models';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'inkapp-settings-page',
  templateUrl: './settings.component.html',
  styles: []
})
export class SettingsPage implements OnInit {
  view: InkAppSettingsItem;
  accessUrl;
  constructor(
    private _store: Store,
    private _localDatabase: LocalDatabase,
    private _settingsService: SettingsService
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
