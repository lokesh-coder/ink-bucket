import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { filter, map } from 'rxjs/operators';
import { InkBoardMeta } from '@lib/models';
import { InkBoardsService, InkDatabaseService } from '@lib/services';
import { ClearBuckets, ClearDrops, PopulateBuckets, PopulateDrops, PopulateBoards } from '@store/actions';
import { BoardsState } from '@store/states';

@Component({
  selector: 'inkapp-home-page',
  templateUrl: './home.page.html'
})
export class HomePage implements OnInit, OnDestroy {
  @Select(BoardsState) boards$: InkBoardMeta[];
  constructor(private _store: Store) {}

  ngOnInit() {
    this._store.dispatch(new PopulateBoards());
    this._store.dispatch(new PopulateBuckets());
    this._store.dispatch(new PopulateDrops());
  }

  ngOnDestroy() {
    this._store.dispatch(new ClearBuckets());
    this._store.dispatch(new ClearDrops());
  }
}
