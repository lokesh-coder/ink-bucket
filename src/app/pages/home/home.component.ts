import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { Store } from '@ngxs/store';
import { LoadBoard } from '../../store/actions/board.actions';
import { filter, map } from 'rxjs/operators';
import { InkBoard, InkBoardMeta } from '../../models';
import { LocalDatabase } from '../../services/localdb.service';

@Component({
  selector: 'inkapp-home-page',
  templateUrl: './home.component.html',
  styles: []
})
export class HomePage implements OnInit {
  boards: InkBoardMeta[];
  constructor(private _boardService: BoardService, private _store: Store, private _localDatabase: LocalDatabase) {}

  async ngOnInit() {
    this._store.select(s => s.board).subscribe(b => {
      this.boards = b;
    });
    const boards = await this._boardService.getBoards();
    boards.map(b => ({ _id: b._id, name: b.name, description: b.description, createdAt: b.createdAt }));
    this._store.dispatch(new LoadBoard(boards));

    const db = await this._localDatabase.getDatabase();
    db.settings
      .find()
      .exec()
      .then(col => {
        console.log('got settings collection,', col);
      });
  }
}
