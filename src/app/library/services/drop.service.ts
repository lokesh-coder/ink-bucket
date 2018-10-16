import { Injectable } from '@angular/core';
import { InkDropMeta } from '../models';
import { InkDatabaseService } from './database.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InkDropsService {
  constructor(private _firestore: AngularFirestore, private _db: InkDatabaseService) {}

  create(dropData: InkDropMeta) {
    const id = this._firestore.createId();
    const createdAt = Date.now();
    return from(this._firestore.collection<InkDropMeta>(`drops`).doc(id).set({...dropData, id, createdAt}).then(_ => dropData));
  }

  update(dropData: Partial<InkDropMeta>) {
      return from(this._firestore.collection<InkDropMeta>('drops').doc(dropData.id).update(dropData).then(_ => dropData));
  }

  get(bucketId) {
      return this._firestore.collection<InkDropMeta>(`drops`, ref => ref.orderBy('createdAt')).doc(bucketId).valueChanges();
  }

  getAll() {
      return this._firestore.collection<InkDropMeta>(`drops`, ref => ref.orderBy('createdAt')).valueChanges();
  }

  deleteAllUnderBucket(bucketId: string) {
    const deleteQuery = this._firestore.collection<InkDropMeta>('drops', ref => ref.where('bucketId', '==', bucketId))
    .snapshotChanges()
    .pipe(map(querySnapshot => {
      querySnapshot.forEach(snapshot => snapshot.payload.doc.ref.delete());
    }));
    return from(deleteQuery);
  }

  // async deleteAll() {
  //   const db = await this._db.getDatabase();
  //   return db.drops.find().remove();
  // }

  delete(dropId: string ) {
    return from(this._firestore.collection<InkDropMeta>('drops').doc(dropId).delete());
  }
}
