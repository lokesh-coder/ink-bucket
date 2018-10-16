import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import {  InkBoardMeta } from '../models';
import { Store } from '@ngxs/store';
import { CreateBoard } from '../store/actions/board.actions';
import { BOARD_DEFAULT_NAME, BOARD_DEFAULT_DESC } from '../../ink.config';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { AuthService } from '@services/auth.service';
import { take, map, skipWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InkBoardsService {
  constructor(private _firestore: AngularFirestore, private _auth: AuthService, private _store: Store) {
    this._auth.userInfo.pipe(
      take(1),
      map(user => {
        const id = this._firestore.createId();
        const createdAt = Date.now();
        const boardData = { name: BOARD_DEFAULT_NAME, description: BOARD_DEFAULT_DESC, createdby: user.uid, createdAt, id  };
        this._store.dispatch(new CreateBoard(boardData));
      })
    ).subscribe();
  }

  create(boardData: InkBoardMeta): Observable<any> {
    return from(this._firestore.collection<InkBoardMeta>('boards').doc(boardData.id).set(boardData).then(_ => boardData));
  }

  createIfNot(boardData: InkBoardMeta): Observable<any> {
    const id = this._firestore.createId();
    const createdAt = Date.now();
    return this._firestore
    .collection<InkBoardMeta>('boards', ref => ref.where('name', '==', boardData.name))
    .snapshotChanges()
    .pipe(
      take(1),
      skipWhile(data => data.length > 0),
      map(_ => from(this._firestore.collection<InkBoardMeta>(`boards`).doc(id).set({...boardData, id, createdAt})))
    );
  }

  fetchAllBoards() {
    return this._firestore
    .collection<InkBoardMeta>('boards').valueChanges();
  }
}
