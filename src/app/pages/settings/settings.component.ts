import { Component, OnInit } from '@angular/core';
import { LocalDatabase } from '../../services/localdb.service';
import { SettingsService } from '../../services/settings.service';
import { Store } from '@ngxs/store';
import { UpdateSettings, LoadSettings } from '../../store/actions/settings.action';

@Component({
  selector: 'inkapp-settings-page',
  templateUrl: './settings.component.html',
  styles: []
})
export class SettingsPage implements OnInit {
  constructor(
    private _store: Store,
    private _localDatabase: LocalDatabase,
    private _settingsService: SettingsService
  ) {}

  ngOnInit() {
    this._settingsService.getAll().then(doc => {
      this._store.dispatch(new LoadSettings(doc));
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
