import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { filter, map } from 'rxjs/operators';
import { InkBoardMeta } from '@lib/models';
import { InkBoardsService, InkDatabaseService } from '@lib/services';
import { FetchAllBoards, FetchAllBuckets, FetchAllDrops, RemoveAllBuckets, RemoveAllDrops } from '@store/actions';
import { BoardsState } from '@store/states';

@Component({
  selector: 'inkapp-home-page',
  templateUrl: './home.page.html'
})
export class HomePage implements OnInit, OnDestroy {
  @Select(BoardsState) boards$: InkBoardMeta[];
  constructor(private _store: Store) {}

  ngOnInit() {
    this._store.dispatch(new FetchAllBoards());
    this._store.dispatch(new FetchAllBuckets());
    this._store.dispatch(new FetchAllDrops());
  }

  ngOnDestroy() {
    this._store.dispatch(new RemoveAllBuckets());
    this._store.dispatch(new RemoveAllDrops());
  }
}
