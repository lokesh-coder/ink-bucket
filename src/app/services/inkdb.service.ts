import { Injectable } from '@angular/core';

const PouchDB = require('pouchdb');

const POUCHDB = PouchDB.default;

console.log('POUCHDB', POUCHDB);

import { from } from 'rxjs';

POUCHDB.plugin(require('relational-pouch'));
POUCHDB.plugin(require('pouchdb-find'));
POUCHDB.debug.disable();

@Injectable({
  providedIn: 'root'
})
export class InkDBService {
  private _db: any = new POUCHDB('InkDB');
  constructor() {
    this._setSchema();
    this._setIndex();
  }
  save(type, data) {
    return this._db.rel.save(type, data);
  }
  find(type, criteria) {
    return from(this._db.rel.find(type, criteria));
  }
  findChildren(type, belongsTo, criteria) {
    return from(this._db.rel.findHasMany(type, belongsTo, criteria));
  }
  private _setSchema() {
    this._db.setSchema([
      {
        singular: 'board',
        plural: 'boards',
        relations: {
          buckets: { hasMany: 'bucket' }
        }
      },
      {
        singular: 'bucket',
        plural: 'buckets',
        relations: {
          board: { belongsTo: 'board' },
          inks: { hasMany: 'inks' }
        }
      },
      {
        singular: 'ink',
        plural: 'inks',
        relations: {
          bucket: { belongsTo: 'bucket' }
        }
      }
    ]);
  }
  private _setIndex() {
    this._db.default.createIndex({ index: { fields: ['data.bucket', '_id'] } });
    this._db.default.createIndex({ index: { fields: ['data.ink', '_id'] } });
  }
}
