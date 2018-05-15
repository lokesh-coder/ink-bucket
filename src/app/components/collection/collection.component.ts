import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { InkBucket, InkCollection } from '../../ink.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'inkapp-collection',
  templateUrl: './collection.component.html',
  styles: []
})
export class CollectionComponent implements OnInit {
  bucket: Observable<InkBucket>;
  collection: InkCollection;
  constructor(private store: Store) {
    this.store
      .select(s => s.collection)
      .pipe(map(x => x[0]))
      .subscribe(r => {
        console.log('CColl', r);
        this.collection = r;
      });
  }

  ngOnInit() {
    this.bucket = this.store.select(s => s.bucket).pipe(map(x => x.filter(y => y.collectionId === this.collection.id)));
  }
}
