import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { InkBucketMeta } from '../models';
import { InkDatabaseService } from './database.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { from } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InkBucketsService {
  constructor(private _firestore: AngularFirestore, private _auth: AuthService, private _db: InkDatabaseService, private _store: Store) {}
  create(bucketData: InkBucketMeta) {
    bucketData.id = this._firestore.createId();
    bucketData.createdAt = Date.now();
    return from(this._firestore.collection<InkBucketMeta>(`buckets`).doc(bucketData.id).set(bucketData).then(_ => bucketData));
  }

  get(boardId) {
    return this._firestore.collection<InkBucketMeta>(`buckets`).doc(boardId).valueChanges().pipe(take(1));
  }

  getAll() {
    return this._firestore.collection<InkBucketMeta>(`buckets`).valueChanges().pipe(take(1));
  }

  update(bucketData: Partial<InkBucketMeta>) {
    return from(this._firestore.collection<InkBucketMeta>('buckets').doc(bucketData.id).update(bucketData).then(_ => bucketData));
  }

  delete(bucketId: string) {
    return from(this._firestore.collection<InkBucketMeta>('buckets').doc(bucketId).delete());
  }
}
