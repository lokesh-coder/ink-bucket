import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { InkDropMeta } from '../models';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class InkDropsService {
  constructor(private _firestore: AngularFirestore, private _user: UserService) {}

  create(dropData: InkDropMeta) {
    dropData.id = this._firestore.createId();
    dropData.createdAt = Date.now();
    dropData.createdBy = this._user.getUserData().id;
    return from(this._firestore.collection<InkDropMeta>(`drops`).doc(dropData.id).set(dropData).then(_ => dropData));
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

  // deleteAll() {}

  delete(dropId: string ) {
    return from(this._firestore.collection<InkDropMeta>('drops').doc(dropId).delete());
  }
}
