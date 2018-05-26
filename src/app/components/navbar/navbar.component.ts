import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CreateBucket } from '../../store/actions/bucket.action';
import { map, tap, filter } from 'rxjs/operators';
import { BucketService } from '../../services/bucket.service';

@Component({
  selector: 'inkapp-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  currentBoardId: string;
  constructor(private _store: Store, private _bucketService: BucketService) {}

  ngOnInit() {
    this._store
      .select(s => s.board)
      .pipe(
        filter(s => s.length > 0),
        map(s => s[0]._id),
        tap(y => {
          console.log('get boars==>', y);
        })
      )
      .subscribe(r => (this.currentBoardId = r));
  }

  newBucket() {
    if (!this.currentBoardId) {
      return;
    }
    this._bucketService.newBucket({ boardId: this.currentBoardId, name: 'Hello-123' }).then(bucket => {
      this._store.dispatch(new CreateBucket(bucket));
    });
  }
}
