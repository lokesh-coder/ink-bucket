import { Component, OnInit, NgZone } from '@angular/core';
import { Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { RxCollection, RxDatabase } from 'rxdb';
import { InkSettingsService } from '@lib/services';
import { PopulateSettings } from '@store/actions';

@Component({
  selector: 'inkapp-root',
  template: `
  <inkapp-header></inkapp-header>
  <router-outlet></router-outlet>
  `
})
export class InkApp implements OnInit {
  constructor(private _store: Store, private _settingsService: InkSettingsService) {
    // console.log('cons', this.db.conn);
  }
  ngOnInit() {
    this._settingsService.setDefaultSettings().then((doc: any) => {
      if (doc) {
        this._store.dispatch(new PopulateSettings(doc));
      }
    });
  }
}
