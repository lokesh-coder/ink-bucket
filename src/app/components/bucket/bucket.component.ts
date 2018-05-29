import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { InkBucket, Ink, InkBucketMeta, InkColorMeta, InkAppView, InkAppSettings } from '../../models';
import { Observable } from 'rxjs';
import { filter, tap, map } from 'rxjs/operators';
import { AddInkColor, LoadInkColorsInBucket } from '../../store/actions/ink.action';
import { BucketService } from '../../services/bucket.service';
import { RenameBucket } from '../../store/actions/bucket.action';
import { InkColorService } from '../../services/ink.service';

@Component({
  selector: 'inkapp-bucket',
  templateUrl: './bucket.component.html',
  styles: []
})
export class BucketComponent implements OnInit {
  @Input() index: number;
  @Input() bucketData: InkBucketMeta;
  ink: Observable<Ink>;
  settings: Observable<InkAppSettings>;
  view: InkAppView;
  constructor(private _store: Store, private _bucketService: BucketService, private _inkColorService: InkColorService) {
    this.ink = this._store.select(s => s.ink).pipe(map(x => x.filter(y => y.bucketId === this.bucketData._id)));
    this.settings = this._store.select(s => s.settings).pipe(map(s => s.filter(x => x.key === 'view')[0]));
  }

  ngOnInit() {
    this._inkColorService.getInkColorsInBuckets(this.bucketData._id).then(docs => {
      this._store.dispatch(new LoadInkColorsInBucket(docs));
    });
  }
  addNewInk() {
    const data: InkColorMeta = {
      bucketId: this.bucketData._id,
      displayValue: 'white',
      meta: {},
      name: '#fff'
    };
    this._inkColorService.addInkColor(this.bucketData._id, data).then(doc => {
      this._store.dispatch(new AddInkColor(this.bucketData._id, doc as any));
    });
  }
  onTitleChange(newTitle) {
    this._bucketService.changeBucketName(this.bucketData._id, newTitle).then(bucket => {
      this._store.dispatch(new RenameBucket(this.bucketData._id, bucket.name));
    });
  }
}
