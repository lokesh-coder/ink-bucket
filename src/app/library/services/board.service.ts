import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { RxDocument } from 'rxdb';
import { InkBoardDoc } from '../models';
import { Store } from '@ngxs/store';
import { CreateBoard } from '../store/actions/board.actions';
import { InkDatabaseService } from './database.service';
import { BOARD_DEFAULT_NAME, BOARD_DEFAULT_DESC } from '../../ink.config';

@Injectable({
  providedIn: 'root'
})
export class InkBoardsService {
  constructor(private _db: InkDatabaseService, private _store: Store) {
    this.createBoard(BOARD_DEFAULT_NAME, BOARD_DEFAULT_DESC).then(doc => {
      if (!doc) {
        return;
      }
      const board = { _id: doc._id, name: doc.name, description: doc.description, createdAt: doc.createdAt };
      this._store.dispatch(new CreateBoard(board));
    });
  }
  async createBoard(name: string, description: string = ''): Promise<RxDocument<InkBoardDoc>> {
    const db = await this._db.getDatabase();
    const existingRecords = await db.boards.find().exec();
    if (existingRecords.length > 0) {
      return null;
    }
    return db.boards.insert({ name, description }).catch(error => {
      console.error('Error while saving board record!', error);
      return null;
    });
  }

  async getBoards() {
    const db = await this._db.getDatabase();
    return await db.boards.find().exec();
  }
}
