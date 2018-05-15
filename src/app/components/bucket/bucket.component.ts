import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { InkBucket, Ink, InkBucketMeta } from '../../ink.model';
import { Observable } from 'rxjs';
import { filter, tap, map } from 'rxjs/operators';
import { AddNewInk } from '../../store/actions/ink.action';

@Component({
  selector: 'inkapp-bucket',
  templateUrl: './bucket.component.html',
  styles: []
})
export class BucketComponent implements OnInit {
  @Input() collectionId: number;
  @Input() bucketData: InkBucketMeta;
  ink: Observable<Ink>;
  constructor(private store: Store) {
    this.ink = this.store.select(s => s.ink).pipe(map(x => x.filter(y => y.bucketId === this.bucketData.id)));
  }

  ngOnInit() {}
  addNewInk() {
    this.store.dispatch(new AddNewInk({ bucketId: this.bucketData.id, value: '#fff', meta: {} }));
  }
}
