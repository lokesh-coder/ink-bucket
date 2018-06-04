import { Injectable } from '@angular/core';
import { InkDropMeta } from '../models';
import { InkDatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class InkDropsService {
  constructor(private _db: InkDatabaseService) {}

  async create(bucketId, dropData: InkDropMeta) {
    const db = await this._db.getDatabase();
    return db.drops.insert({ ...dropData, bucketId }).catch(error => {
      console.error('Error while saving ink color!', error);
    });
  }

  async update(inkId, inkData: InkDropMeta) {
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

  async get(bucketId) {
    const db = await this._db.getDatabase();
    return db.drops.find({ bucketId }).exec();
  }
  async getAll() {
    const db = await this._db.getDatabase();
    return db.drops.find().exec();
  }

  async deleteAll() {
    const db = await this._db.getDatabase();
    return db.drops.find().remove();
  }
}
