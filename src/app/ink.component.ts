import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ChangeView } from './store/actions/settings.action';
import { InkAppView } from './ink.model';
import { DBService } from './services/db.service';

@Component({
  selector: 'inkapp-root',
  template: '<router-outlet></router-outlet>'
})
export class InkApp implements OnInit {
  constructor(private store: Store, private db: DBService) {}
  ngOnInit() {
    this.store.dispatch(new ChangeView(InkAppView.ROUND));
  }
}
