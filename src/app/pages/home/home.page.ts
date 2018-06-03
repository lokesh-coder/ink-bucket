import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { filter, map } from 'rxjs/operators';
import { InkBoardMeta } from '@lib/models';
import { InkBoardService, InkDatabaseService } from '@lib/services';
import { PopulateBoards, ClearBuckets, ClearDrops } from '@store/actions';

@Component({
  selector: 'inkapp-home-page',
  templateUrl: './home.page.html'
})
export class HomePage implements OnInit, OnDestroy {
  boards: InkBoardMeta[];
  constructor(private _boardService: InkBoardService, private _store: Store, private _db: InkDatabaseService) {}

  async ngOnInit() {
    this._store.select(s => s.boards).subscribe(b => {
      this.boards = b;
    });
    const boards = await this._boardService.getBoards();
    boards.map(b => ({ _id: b._id, name: b.name, description: b.description, createdAt: b.createdAt }));
    this._store.dispatch(new PopulateBoards(boards));

    const db = await this._db.getDatabase();
    db.settings
      .find()
      .exec()
      .then(col => {
        console.log('got settings collection,', col);
      });
  }

  ngOnDestroy() {
    this._store.dispatch(new ClearBuckets());
    this._store.dispatch(new ClearDrops());
  }
}
