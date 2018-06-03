import { Component, OnInit, Input } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { InkBoardMeta, InkBucketMeta, InkBuckets, InkAppSettings } from '@lib/models';
import { InkBucketService } from '@lib/services';
import { PopulateBoards, PopulateBuckets } from '@store/actions';

@Component({
  selector: 'inkapp-board',
  templateUrl: './board.component.html'
})
export class BoardComponent implements OnInit {
  @Input() data: InkBoardMeta;
  buckets: Observable<InkBuckets>;
  settings: Observable<InkAppSettings>;
  constructor(private _store: Store, private _bucketService: InkBucketService) {}

  ngOnInit() {
    this.buckets = this._store
      .select(s => s.buckets)
      .pipe(map(buckets => buckets.filter(s => s.boardId === this.data._id)));
    this._bucketService.getBucketsInBoard(this.data._id).then(buckets => {
      console.log('#1', buckets);
      this._store.dispatch(new PopulateBuckets(buckets));
    });
    this.settings = this._store.select(s => s.settings).pipe(map(s => s.filter(x => x.key === 'view')[0]));
  }
}
