import { Injectable } from '@angular/core';
import { LocalDatabase } from './localdb.service';
import { InkColorMeta } from '../models';

@Injectable({
  providedIn: 'root'
})
export class InkColorService {
  constructor(private _localDatabase: LocalDatabase) {}

  async addInkColor(bucketId, inkData: InkColorMeta) {
    const db = await this._localDatabase.getDatabase();
    return db.ink.insert({ ...inkData, bucketId }).catch(error => {
      console.error('Error while saving ink color!');
    });
  }

  async updateInkColor(inkId, inkData: InkColorMeta) {
    const db = await this._localDatabase.getDatabase();
    return db.ink
      .findOne(inkId)
      .update({
        $set: {
          ...inkData
        }
      })
      .catch(error => {
        console.error('Error while updating ink color!', error);
      });
  }

  async getInkColorsInBuckets(bucketId) {
    const db = await this._localDatabase.getDatabase();
    return db.ink.find({ bucketId }).exec();
  }
}
