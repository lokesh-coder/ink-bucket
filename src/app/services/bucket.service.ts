import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { LocalDatabase } from './localdb.service';
import { InkBucketMeta } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BucketService {
  constructor(private _db: LocalDatabase, private _store: Store) {}
  async newBucket(bucketData: InkBucketMeta) {
    const db = await this._db.getDatabase();
    return db.bucket.insert(bucketData).catch(error => {
      console.error('Error while creating bucket record!', error);
      return null;
    });
  }

  async getBucketsInBoard(boardId) {
    const db = await this._db.getDatabase();
    return db.bucket.find({ boardId }).exec();
  }

  async changeBucketName(bucketId: string, newName: string) {
    const db = await this._db.getDatabase();
    return db.bucket
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
    return db.bucket
      .findOne(bucketId)
      .remove()
      .catch(error => {
        console.error('Error while removing bucket name');
        return null;
      });
  }
}
