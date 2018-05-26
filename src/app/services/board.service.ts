import { Injectable } from '@angular/core';
import { LocalDatabase } from './localdb.service';
import { from, Observable } from 'rxjs';
import { RxDocument } from 'rxdb';
import { InkBoardDoc } from '../models';
import { Store } from '@ngxs/store';
import { CreateBoard } from '../store/actions/board.actions';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  constructor(private _db: LocalDatabase, private _store: Store) {
    this.createBoard('Beautiful', 'Default Board').then(doc => {
      console.log('got this', doc);
      if (!doc) {
        return;
      }
      const board = { id: doc.id, name: doc.name, description: doc.description, createdAt: doc.createdAt };
      this._store.dispatch(new CreateBoard(board));
    });
  }
  async createBoard(name: string, description: string = ''): Promise<RxDocument<InkBoardDoc>> {
    const db = await this._db.getDatabase();
    const existingRecords = await db.board.find().exec();
    if (existingRecords.length > 0) {
      return null;
    }
    return db.board.insert({ name, description }).catch(error => {
      console.error('Error while saving board record!', error);
      return null;
    });
  }

  async getBoards() {
    const db = await this._db.getDatabase();
    return await db.board.find().exec();
  }
}
