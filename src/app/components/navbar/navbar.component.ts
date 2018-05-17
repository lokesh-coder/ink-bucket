import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CreateBucket } from '../../store/actions/bucket.action';
import { map, tap, filter } from 'rxjs/operators';

@Component({
  selector: 'inkapp-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  currentCollectionId: string;
  constructor(private store: Store) {}

  ngOnInit() {
    this.store
      .select(s => s.collection)
      .pipe(filter(s => s.length > 0), map(s => s[0].id))
      .subscribe(r => (this.currentCollectionId = r));
  }

  newBucket() {
    if (this.currentCollectionId) {
      this.store.dispatch(new CreateBucket({ collectionId: this.currentCollectionId, name: 'Hello-123' }));
    }
  }
}
