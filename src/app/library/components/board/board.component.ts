import { Component, Input, OnInit } from '@angular/core';
import { InkBoardMeta, InkBuckets } from '@lib/models';
import { children } from '@lib/operators';
import { Select, Store } from '@ngxs/store';
import { BUCKET_DEFAULT_NAME } from '@root/ink.config';
import { CreateBucket } from '@store/actions';
import { SettingsState } from '@store/states';
import { Observable } from 'rxjs';

@Component({
  selector: 'inkapp-board',
  templateUrl: './board.component.html'
})
export class BoardComponent implements OnInit {
  @Input() data: InkBoardMeta;
  @Select(SettingsState.view) view$: Observable<string>;
  buckets$: Observable<InkBuckets>;
  constructor(private _store: Store) {}

  ngOnInit() {
    this.buckets$ = this._store.select(s => s.buckets).pipe(children(this.data.id, 'boardId'));
  }

  createBucket() {
    this._store.dispatch(new CreateBucket({ name: BUCKET_DEFAULT_NAME, boardId: this.data.id}));
  }
}
