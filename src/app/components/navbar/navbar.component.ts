import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CreateBucket } from '../../store/actions/bucket.action';

@Component({
  selector: 'inkapp-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {}

  newBucket() {
    this.store.dispatch(new CreateBucket({ collectionId: 1, id: 1, name: 'Hello-123' }));
  }
}
