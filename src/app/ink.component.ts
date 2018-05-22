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
  constructor(private store: Store, private db: DBService, private zone: NgZone) {
    // console.log('cons', this.db.conn);
  }
  ngOnInit() {
    try {
      this.getDb();
    } catch (e) {
      console.log('Unexpected error occurred', e);
    }
    this.store.dispatch(new ChangeView(InkAppView.ROUND));
  }

  async getDb() {
    this.zone.run(() => {});
    const db = await this.db.localDb.getDatabase();
    // const d = await db.board.dump(false);
    console.log('db');
    // const firstDoc = await db.board.findOne().exec();
    // console.log('name', firstDoc);
    // const f: string = firstDoc.name;

    // this.db.localDb
    //   .getDatabase()
    //   .then((a: InkDb) => {
    //     a.board.$.subscribe(f => console.log(f));
    //     // const foo = a.board.newDocument({ id: 'xyz', name: 'super appu' });
    //     // foo.save();
    //     return a;
    //   })
    //   .then(db => {
    //     db.board
    //       .find()
    //       .exec()
    //       .catch();
    //     console.log();
    //     // const fgt = db.board.find().$.subscribe(
    //     //   n => {
    //     //     console.log('now', n);
    //     //   },
    //     //   e => {
    //     //     console.log('de', e);
    //     //   }
    //     // );
    //     return db;
    //   })
    //   .catch(e => {
    //     console.log('Unexpected error occurred', e);
    //   });
  }
}
