import { Component, OnInit, Input } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { InkBoardMeta, InkBucketMeta, InkBuckets, InkAppSettings, InkAppSettingsItem } from '@lib/models';
import { InkBucketsService } from '@lib/services';
import { PopulateBoards, PopulateBuckets } from '@store/actions';
import { BucketsState, SettingsState } from '@store/states';
import { children } from '@lib/operators';

@Component({
  selector: 'inkapp-board',
  templateUrl: './board.component.html'
})
export class BoardComponent implements OnInit {
  @Input() data: InkBoardMeta;
  @Select(SettingsState.view) view$: Observable<InkAppSettingsItem>;
  buckets$: Observable<InkBuckets>;
  constructor(private _store: Store) {}

  ngOnInit() {
    this.buckets$ = this._store.select(s => s.buckets).pipe(children(this.data._id, 'boardId'));
  }
}
