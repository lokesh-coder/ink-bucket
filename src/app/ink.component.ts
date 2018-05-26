import { Component, OnInit, NgZone } from '@angular/core';
import { Store } from '@ngxs/store';
import { ChangeView } from './store/actions/settings.action';
import { InkAppView, InkDb } from './models';
import { DBService } from './services/db.service';
import { tap } from 'rxjs/operators';
import { RxCollection, RxDatabase } from 'rxdb';

@Component({
  selector: 'inkapp-root',
  template: '<router-outlet></router-outlet>'
})
export class InkApp implements OnInit {
  constructor(private store: Store, private db: DBService) {
    // console.log('cons', this.db.conn);
  }
  ngOnInit() {
    this.store.dispatch(new ChangeView(InkAppView.ROUND));
  }
}
