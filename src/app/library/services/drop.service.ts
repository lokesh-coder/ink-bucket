import { Injectable } from '@angular/core';
import { InkDropMeta } from '../models';
import { InkDatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class InkDropsService {
  constructor(private _db: InkDatabaseService) {}

  async create(dropData: InkDropMeta) {
    const db = await this._db.getDatabase();
    return db.drops.insert(dropData).catch(error => {
      console.error('Error while saving ink color!', error);
    });
  }

  async update(dropData: Partial<InkDropMeta>) {
    const db = await this._db.getDatabase();
    return db.drops
      .findOne(dropData._id)
      .update({
        $set: dropData
      })
      .catch(error => {
        console.error('Error while updating ink color!', error);
      });
  }

  async get(bucketId) {
    const db = await this._db.getDatabase();
    return db.drops
      .find({ bucketId })
      .sort('createdAt')
      .exec();
  }
  async getAll() {
    const db = await this._db.getDatabase();
    return db.drops
      .find()
      .sort('createdAt')
      .exec();
  }

  async deleteAllUnderBucket(bucketId: string) {
    const db = await this._db.getDatabase();
    return db.drops.find({ bucketId: { $eq: bucketId } }).remove();
  }

  async deleteAll() {
    const db = await this._db.getDatabase();
    return db.drops.find().remove();
  }
  async delete(dropId: string) {
    const db = await this._db.getDatabase();
    return db.drops.find(dropId).remove();
  }
}
