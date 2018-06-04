import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { InkBucketMeta } from '../models';
import { InkDatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class InkBucketsService {
  constructor(private _db: InkDatabaseService, private _store: Store) {}
  async create(bucketData: InkBucketMeta) {
    const db = await this._db.getDatabase();
    return db.buckets.insert(bucketData).catch(error => {
      console.error('Error while creating bucket record!', error);
      return null;
    });
  }

  async get(boardId) {
    const db = await this._db.getDatabase();
    return db.buckets.find({ boardId }).exec();
  }

  async getAll() {
    const db = await this._db.getDatabase();
    return db.buckets.find().exec();
  }

  async deleteAll() {
    const db = await this._db.getDatabase();
    return db.buckets.find().remove();
  }

  async update(bucketData: Partial<InkBucketMeta>) {
    const db = await this._db.getDatabase();
    return db.buckets
      .findOne(bucketData._id)
      .update({
        $set: bucketData
      })
      .catch(error => {
        console.error('Error while updating bucket name');
        return null;
      });
  }

  async delete(bucketId: string) {
    const db = await this._db.getDatabase();
    return db.buckets
      .findOne(bucketId)
      .remove()
      .catch(error => {
        console.error('Error while removing bucket name');
        return null;
      });
  }
}
