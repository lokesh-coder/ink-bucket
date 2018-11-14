import { Injectable } from '@angular/core';
import { InkAppSettings } from '@lib/models';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InkSettingsService {
  constructor() {}
  setDefaultSettings() {
    this._set([{view: 'default'}]);
  }
  add(key, value) {
    const settings = this._get() || [];
    this._set([...settings, {key, value}]);
    return of({key, value});
  }

  update(key, value) {
    let settings =  this._get();
    settings = settings.map(x => {
      if (x.key === key) {
        x.value = value;
      }
      return x;
    });
    this._set(settings);
    return of({key, value});
  }

  getAll() {
    return this._get() || [];
  }

  addAll(settings: InkAppSettings) {
    for (const item of settings) {
      this.add(item.key, item.value);
     }
     return of(settings);
  }

  private _get(key= 'inkapp.settings') {
   return JSON.parse(localStorage.getItem(key));
  }
  private _set(value) {
    localStorage.setItem(`inkapp.settings`, JSON.stringify(value));
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
