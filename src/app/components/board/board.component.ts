import { Component, OnInit, Input } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { InkBucket, InkBoard, InkBoardMeta, InkBucketMeta } from '../../models';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { BucketService } from '../../services/bucket.service';
import { LoadBuckets } from '../../store/actions/bucket.action';

@Component({
  selector: 'inkapp-board',
  templateUrl: './board.component.html'
})
export class BoardComponent implements OnInit {
  buckets: Observable<InkBucketMeta[]>;
  @Input() data: InkBoardMeta;
  constructor(private _store: Store, private _bucketService: BucketService) {}

  ngOnInit() {
    this.buckets = this._store
      .select(s => s.bucket)
      .pipe(map(buckets => buckets.filter(s => s.boardId === this.data._id)));
    this._bucketService.getBucketsInBoard(this.data._id).then(buckets => {
      this._store.dispatch(new LoadBuckets(buckets));
    });
  }
}
