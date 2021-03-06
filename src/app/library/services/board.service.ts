import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngxs/store';
import { AuthService } from '@services/auth.service';
import { from, Observable } from 'rxjs';
import { map, skipWhile, take } from 'rxjs/operators';
import { BOARD_DEFAULT_DESC, BOARD_DEFAULT_NAME } from '../../ink.config';
import { InkBoardMeta } from '../models';
import { CreateBoard } from '../store/actions/board.actions';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class InkBoardsService {
  constructor(private _firestore: AngularFirestore, private _auth: AuthService, private _user: UserService, private _store: Store) {
    const id = this._firestore.createId();
    const createdAt = Date.now();
    const createdBy = this._user.getUserData();
    const boardData = { name: BOARD_DEFAULT_NAME, description: BOARD_DEFAULT_DESC, createdBy, createdAt, id  };
    this._store.dispatch(new CreateBoard(boardData));
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
