import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, tap, map } from 'rxjs/operators';
import { InkBucketMeta, InkAppView, InkDropMeta } from '@lib/models';
import { InkBucketService, InkDropService } from '@lib/services';
import { AddDrop, RenameBucket, DeleteBucket, PopulateBuckets, PopulateDrops } from '@store/actions';

@Component({
  selector: 'inkapp-bucket',
  templateUrl: './bucket.component.html',
  styles: []
})
export class BucketComponent implements OnInit {
  @Input() index: number;
  @Input() bucketData: InkBucketMeta;
  drop: Observable<InkDropMeta>;
  view: InkAppView;
  constructor(
    private _store: Store,
    private _bucketService: InkBucketService,
    private _inkColorService: InkDropService
  ) {
    this.drop = this._store.select(s => s.drops).pipe(map(x => x.filter(y => y.bucketId === this.bucketData._id)));
  }

  ngOnInit() {
    this._inkColorService.getInkColorsInBuckets(this.bucketData._id).then(docs => {
      this._store.dispatch(new PopulateDrops(docs));
    });
  }
  addNewInk() {
    const data: InkDropMeta = {
      bucketId: this.bucketData._id,
      displayValue: 'white',
      meta: {},
      name: '#fff'
    };
    this._inkColorService.addInkColor(this.bucketData._id, data).then(doc => {
      this._store.dispatch(new AddDrop(this.bucketData._id, doc as any));
    });
  }
  onTitleChange(newTitle) {
    this._bucketService.changeBucketName(this.bucketData._id, newTitle).then(bucket => {
      this._store.dispatch(new RenameBucket(this.bucketData._id, bucket.name));
    });
  }

  deleteBucket() {
    this._bucketService.deleteBucket(this.bucketData._id).then(bucket => {
      this._store.dispatch(new DeleteBucket(this.bucketData._id));
    });
  }
}
