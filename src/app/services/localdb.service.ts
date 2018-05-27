import { Injectable } from '@angular/core';
import RxDB, { RxDatabase, RxCollection } from 'rxdb';
import * as PouchdbAdapterIdb from 'pouchdb-adapter-idb';
import * as PouchdbAdapterHttp from 'pouchdb-adapter-http';
import RxDBSchemaCheckModule from 'rxdb/plugins/schema-check';
import RxDBErrorMessagesModule from 'rxdb/plugins/error-messages';
import RxDBValidateModule from 'rxdb/plugins/validate';
import { DatabaseSettings } from '../ink.config';
import { BoardSchema, BucketSchema, InkSchema, SettingsSchema } from '../schema';
import { environment } from '../../environments/environment';
import { InkDb } from '../models';

RxDB.QueryChangeDetector.enable();
RxDB.QueryChangeDetector.enableDebugging();
RxDB.plugin(PouchdbAdapterIdb);
RxDB.plugin(RxDBValidateModule);
RxDB.plugin(PouchdbAdapterHttp);
let syncURL = '';
if (!environment.production) {
  RxDB.plugin(RxDBErrorMessagesModule);
  RxDB.plugin(RxDBSchemaCheckModule);
  syncURL = 'http://' + window.location.hostname + ':10101/';
  let doSync = true;
  if (window.location.hash === '#nosync') {
    doSync = false;
  }
}
@Injectable({
  providedIn: 'root'
})
export class LocalDatabase {
  private static DbConn: Promise<InkDb> = null;
  private db: RxDatabase;
  private collections = [
    {
      name: 'board',
      schema: BoardSchema,
      sync: true
    },
    {
      name: 'bucket',
      schema: BucketSchema,
      sync: true
    },
    {
      name: 'ink',
      schema: InkSchema,
      sync: true
    },
    {
      name: 'settings',
      schema: SettingsSchema,
      sync: true
    }
  ];
  constructor() {}
  getDatabase(): Promise<InkDb> {
    if (LocalDatabase.DbConn) {
      return LocalDatabase.DbConn;
    }
    LocalDatabase.DbConn = this.setupDatabase();
    return LocalDatabase.DbConn;
  }

  async deleteDatabase() {
    const db = await this.getDatabase();
    return db.remove();
  }

  private setupDatabase(): Promise<any> {
    return RxDB.create(DatabaseSettings)
      .then(async (db: InkDb) => {
        await Promise.all(this.collections.map((colData: any): Promise<RxCollection<any>> => db.collection(colData)));
        this.showLeader(db);
        this.sync(db, this.collections);
        return db;
      })
      .catch(e => {
        console.log('errror', e);
      });
  }

  private showLeader(db) {
    db.waitForLeadership().then(() => {
      document.title = '♛ ' + document.title;
    });
  }

  private sync(db, collections) {
    collections
      .filter(col => col.sync)
      .map(col => col.name)
      .forEach(colName => db[colName].sync({ remote: syncURL + colName + '/' }));
  }
}
