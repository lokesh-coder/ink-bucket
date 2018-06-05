import { Component, OnInit, Input } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, tap, map } from 'rxjs/operators';
import { InkBucketMeta, InkAppView, InkDropMeta, InkAppSettingsItem, InkDrops } from '@lib/models';
import { InkBucketsService, InkDropsService } from '@lib/services';
import { CreateDrop, UpdateBucket, DeleteBucket } from '@store/actions';
import { SettingsState } from '@store/states';
import { children } from '@lib/operators';

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
    this.drops$ = this._store.select(s => s.drops).pipe(children(this.data._id, 'bucketId'));
  }
  newDrop() {
    const data: InkDropMeta = {
      bucketId: this.data._id,
      displayValue: '#ffffff',
      meta: {},
      name: '#ffffff'
    };
    this._store.dispatch(new CreateDrop(data));
  }
  onTitleChange(name) {
    this._store.dispatch(new UpdateBucket({ ...(this.data as any)._data, name }));
  }

  deleteBucket() {
    this._store.dispatch(new DeleteBucket(this.data._id));
  }
}
