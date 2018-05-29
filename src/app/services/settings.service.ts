import { Injectable } from '@angular/core';
import { LocalDatabase } from './localdb.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(private _localDatabase: LocalDatabase) {}
  async setDefaultSettings() {
    const db = await this._localDatabase.getDatabase();
    const view = await db.settings.find({ key: 'view' }).exec();
    if (view.length > 1) {
      return db.settings.find().exec();
    }
    return db.settings.insert({ key: 'view', value: 'default' }).catch(error => {
      console.log('Error while settings default settings', error);
    });
  }
  async update(key, value) {
    const db = await this._localDatabase.getDatabase();
    return db.settings
      .findOne({ key })
      .update({ $set: { value } })
      .catch(error => {
        console.error('Error while updating settings!', error);
      });
  }

  async getAll() {
    const db = await this._localDatabase.getDatabase();
    return db.settings.find().exec();
  }
}
