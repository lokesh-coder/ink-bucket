import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { map, tap, filter } from 'rxjs/operators';
import { InkBucketService } from '@lib/services';
import { CreateBucket } from '@store/actions';

@Component({
  selector: 'inkapp-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  currentBoardId: string;
  constructor(private _store: Store, private _bucketService: InkBucketService) {}

  ngOnInit() {
    this._store
      .select(s => s.boards)
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
