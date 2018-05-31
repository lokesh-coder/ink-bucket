import { Component, OnInit, NgZone } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoadSettings } from './store/actions/settings.action';
import { InkAppView, InkDb } from './models';
import { DBService } from './services/db.service';
import { tap } from 'rxjs/operators';
import { RxCollection, RxDatabase } from 'rxdb';
import { LocalDatabase } from './services/localdb.service';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'inkapp-root',
  template: `
  <inkapp-navbar></inkapp-navbar>
  <router-outlet></router-outlet>
  `
})
export class InkApp implements OnInit {
  constructor(private _store: Store, private _settingsService: SettingsService) {
    // console.log('cons', this.db.conn);
  }
  ngOnInit() {
    this._settingsService.setDefaultSettings().then((doc: any) => {
      if (doc) {
        this._store.dispatch(new LoadSettings(doc));
      }
    });
  }
}
