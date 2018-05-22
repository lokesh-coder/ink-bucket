import { Injectable } from '@angular/core';
import * as Datastore from 'nedb';
import { bindCallback } from 'rxjs';
import { Store } from '@ngxs/store';
import { LoadInitialData } from '../store/actions/general.action';
import { LocalDatabase } from './localdb.service';
import { RxDatabase } from 'rxdb';

@Injectable({
  providedIn: 'root'
})
export class DBService {
  conn: Promise<RxDatabase> = null;
  db = { bucket: null, ink: null, board: null };
  constructor(private store: Store, public localDb: LocalDatabase) {
    // Object.keys(this.db).forEach(key => {
    //   this.db[key] = new Datastore({ filename: `ink/db/${key}`, autoload: true });
    //   this.db[key].find({}, (err, docs) => {
    //     this.store.dispatch(new LoadInitialData(key, docs));
    //     console.log('while loading..', docs);
    //   });
    // });
  }

  findDocument(coll, q = {}) {
    this.db[coll].find(q, function(err, docs) {
      console.log('database fond done!', docs);
    });
  }

  saveDocument(coll, doc) {
    return bindCallback(this.db[coll].insert(doc));
  }

  updateDocument(coll, query = {}, doc) {
    this.db[coll].update(query, doc);
  }
}
