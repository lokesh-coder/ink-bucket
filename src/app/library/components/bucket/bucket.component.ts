import { Component, Input, OnInit } from '@angular/core';
import { InkBucketMeta, InkDropMeta, InkDrops } from '@lib/models';
import { children } from '@lib/operators';
import { InkBucketsService, InkDropsService } from '@lib/services';
import { Store } from '@ngxs/store';
import { CreateDrop, DeleteBucket, UpdateBucket } from '@store/actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'inkapp-bucket',
  templateUrl: './bucket.component.html'
})
export class BucketComponent implements OnInit {
  @Input() index: number;
  @Input() data: InkBucketMeta;
  drops$: Observable<InkDrops>;
  constructor(
    private _store: Store,
    private _bucketService: InkBucketsService,
    private _dropsService: InkDropsService
  ) {}

  ngOnInit() {
    this.drops$ = this._store.select(s => s.drops).pipe(children(this.data.id, 'bucketId'));
  }
  newDrop() {
    const data: InkDropMeta = {
      id: null,
      createdBy: null,
      bucketId: this.data.id,
      displayValue: '#ffffff',
      meta: {},
      name: '#ffffff'
    };
    this._store.dispatch(new CreateDrop(data));
  }
  onTitleChange(name) {
    this._store.dispatch(new UpdateBucket({ ...this.data, name }));
  }

  deleteBucket() {
    this._store.dispatch(new DeleteBucket(this.data.id));
  }
}
