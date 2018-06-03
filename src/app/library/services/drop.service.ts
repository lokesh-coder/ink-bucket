import { Injectable } from '@angular/core';
import { InkDropMeta } from '../models';
import { InkDatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class InkDropService {
  constructor(private _db: InkDatabaseService) {}

  async addInkColor(bucketId, inkData: InkDropMeta) {
    const db = await this._db.getDatabase();
    return db.drops.insert({ ...inkData, bucketId }).catch(error => {
      console.error('Error while saving ink color!');
    });
  }

  async updateInkColor(inkId, inkData: InkDropMeta) {
    const db = await this._db.getDatabase();
    return db.drops
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
    const db = await this._db.getDatabase();
    return db.drops.find({ bucketId }).exec();
  }
}
