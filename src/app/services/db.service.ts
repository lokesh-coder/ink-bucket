import { Injectable } from '@angular/core';
import * as Datastore from 'nedb';

@Injectable({
  providedIn: 'root'
})
export class DBService {
  db;
  _constructor() {
    this.db = new Datastore({ filename: 'ink/db' });
    this.db.loadDatabase(e => {});
    const doc = {
      hello: 'Hambyui'
    };
    this.db.insert(doc, function(err, newDoc) {
      console.log('database insert done!', doc);
    });
    this.db.find({}, function(err, docs) {
      console.log('database fond done!', docs);
    });
  }
}
