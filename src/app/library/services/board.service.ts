import { Injectable } from '@angular/core';
import { from, Observable, merge } from 'rxjs';
import { RxDocument } from 'rxdb';
import { InkBoardDoc, InkBoardMeta } from '../models';
import { Store } from '@ngxs/store';
import { CreateBoard } from '../store/actions/board.actions';
import { InkDatabaseService } from './database.service';
import { BOARD_DEFAULT_NAME, BOARD_DEFAULT_DESC } from '../../ink.config';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { AuthService } from '@services/auth.service';
import { take, switchMap, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InkBoardsService {
  constructor(private _firestore: AngularFirestore, private _auth: AuthService, private _db: InkDatabaseService, private _store: Store) {
    this._auth.userInfo.pipe(
      take(1),
      map(user => {
        const boardData = { name: BOARD_DEFAULT_NAME, description: BOARD_DEFAULT_DESC, createdby: user.uid  };
        this._store.dispatch(new CreateBoard(boardData));
      })
    ).subscribe();
  }

  create(boardData: InkBoardMeta): Observable<DocumentReference> {
    return from(this._firestore.collection<InkBoardMeta>('boards').add(boardData));
  }

  async fetchAllBoards() {
    const db = await this._db.getDatabase();
    return await db.boards.find().exec();
  }
}
