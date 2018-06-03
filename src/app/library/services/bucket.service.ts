import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { InkBucketMeta } from '../models';
import { InkDatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class InkBucketService {
  constructor(private _db: InkDatabaseService, private _store: Store) {}
  async newBucket(bucketData: InkBucketMeta) {
    const db = await this._db.getDatabase();
    return db.buckets.insert(bucketData).catch(error => {
      console.error('Error while creating bucket record!', error);
      return null;
    });
  }

  async getBucketsInBoard(boardId) {
    const db = await this._db.getDatabase();
    return db.buckets.find({ boardId }).exec();
  }

  async changeBucketName(bucketId: string, newName: string) {
    const db = await this._db.getDatabase();
    return db.buckets
      .findOne(bucketId)
      .update({
        $set: {
          name: newName
        }
      })
      .catch(error => {
        console.error('Error while updating bucket name');
        return null;
      });
  }

  async deleteBucket(bucketId: string) {
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
