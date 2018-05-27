import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { InkBucket, Ink, InkBucketMeta } from '../../models';
import { Observable } from 'rxjs';
import { filter, tap, map } from 'rxjs/operators';
import { AddNewInk } from '../../store/actions/ink.action';
import { BucketService } from '../../services/bucket.service';
import { ENETDOWN } from 'constants';
import { RenameBucket } from '../../store/actions/bucket.action';

@Component({
  selector: 'inkapp-bucket',
  templateUrl: './bucket.component.html',
  styles: []
})
export class BucketComponent implements OnInit {
  @Input() index: number;
  @Input() bucketData: InkBucketMeta;
  ink: Observable<Ink>;
  constructor(private _store: Store, private _bucketService: BucketService) {
    this.ink = this._store.select(s => s.ink).pipe(map(x => x.filter(y => y.bucketId === this.bucketData._id)));
  }

  ngOnInit() {}
  addNewInk() {
    this._store.dispatch(new AddNewInk({ bucketId: this.bucketData._id, value: '#fff', meta: {} }));
  }
  onTitleChange(newTitle) {
    this._bucketService.changeBucketName(this.bucketData._id, newTitle).then(bucket => {
      this._store.dispatch(new RenameBucket(this.bucketData._id, bucket.name));
    });
  }
}
