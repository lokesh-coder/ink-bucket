import { Injectable } from '@angular/core';
import { collections } from '@lib/database/collections';
import { DropPreInsertHook, DropPreSaveHook } from '@lib/database/hooks';
import { InkDb } from '@lib/models';
import { DB_CONFIG, DB_REMOTE_SYNC_URL } from '@root/ink.config';
import { environment } from 'environments/environment.prod';
import * as PouchdbAdapterHttp from 'pouchdb-adapter-http';
import * as PouchdbAdapterIdb from 'pouchdb-adapter-idb';
import RxDB, { RxCollection, RxDatabase } from 'rxdb';
import RxDBErrorMessagesModule from 'rxdb/plugins/error-messages';
import RxDBSchemaCheckModule from 'rxdb/plugins/schema-check';
import RxDBValidateModule from 'rxdb/plugins/validate';

RxDB.QueryChangeDetector.enable();
RxDB.QueryChangeDetector.enableDebugging();
RxDB.plugin(PouchdbAdapterIdb);
RxDB.plugin(RxDBValidateModule);
RxDB.plugin(PouchdbAdapterHttp);
let syncURL = '';
if (!environment.production) {
  RxDB.plugin(RxDBErrorMessagesModule);
  RxDB.plugin(RxDBSchemaCheckModule);
  syncURL = DB_REMOTE_SYNC_URL;
  let doSync = true;
  if (window.location.hash === '#nosync') {
    doSync = false;
  }
}
@Injectable({
  providedIn: 'root'
})
export class InkDatabaseService {
  private static conn: Promise<InkDb> = null;
  private db: RxDatabase;
  constructor() {}
  getDatabase(): Promise<InkDb> {
    if (InkDatabaseService.conn) {
      return InkDatabaseService.conn;
    }
    InkDatabaseService.conn = this.setupDatabase();
    return InkDatabaseService.conn;
  }

  async deleteDatabase() {
    const db = await this.getDatabase();
    return db.remove();
  }

  private setupDatabase(): Promise<any> {
    return RxDB.create(DB_CONFIG)
      .then(async (db: InkDb) => {
        await Promise.all(collections.map((colData: any): Promise<RxCollection<any>> => db.collection(colData)));
        this.showLeaderInTitle(db);
        this.attachHooks(db, collections);
        // this.sync(db, collections);
        return db;
      })
      .catch(e => {
        console.log('errror', e);
      });
  }

  private showLeaderInTitle(db) {
    db.waitForLeadership().then(() => {
      document.title = '♛ ' + document.title;
    });
  }

  private syncWithRemote(db, coll) {
    coll
      .filter(col => col.sync)
      .map(col => col.name)
      .forEach(colName => db[colName].sync({ remote: syncURL + colName + '/' }));
  }

  private attachHooks(db: InkDb, coll) {
    db.drops.preInsert(DropPreInsertHook, false);
    db.drops.preSave(DropPreSaveHook, false);
  }
}
