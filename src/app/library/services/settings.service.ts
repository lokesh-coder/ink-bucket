import { Injectable } from '@angular/core';
import { InkAppSettings } from '@lib/models';
import { InkDatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class InkSettingsService {
  constructor(private _db: InkDatabaseService) {}
  async setDefaultSettings() {
    const db = await this._db.getDatabase();
    const view = await db.settings.find({ key: 'view' }).exec();
    if (view.length > 1) {
      return db.settings.find().exec();
    }
    return db.settings.insert({ key: 'view', value: 'default' }).catch(error => {
      console.log('Error while settings default settings', error);
    });
  }
  async add(key, value) {
    const db = await this._db.getDatabase();
    return db.settings.insert({ key, value }).catch(error => {
      console.error('Error while adding settings!', error);
    });
  }

  async update(key, value) {
    const db = await this._db.getDatabase();
    console.log({ key, value });
    return db.settings.upsert({ key, value }).catch(error => {
      console.error('Error while updating settings!', error);
    });
  }

  async getAll() {
    const db = await this._db.getDatabase();
    return db.settings.find().exec();
  }

  async addAll(settings: InkAppSettings) {
    const db = await this._db.getDatabase();
    try {
      for (const item of settings) {
        await db.settings.insert({ key: item.key, value: item.value });
      }
      return db.settings.find().exec();
    } catch (error) {
      console.error('Error while adding settings!', error);
    }
  }
}
