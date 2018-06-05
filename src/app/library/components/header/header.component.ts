import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { map, tap, filter } from 'rxjs/operators';
import { InkBucketsService } from '@lib/services';
import { CreateBucket } from '@store/actions';
import { BoardsState } from '@store/states';

@Component({
  selector: 'inkapp-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  currentBoardId: string;
  constructor(private _store: Store, private _bucketService: InkBucketsService) {}
  newBucket() {
    const defaultBoardId = this._store.selectSnapshot(BoardsState.defaultBoard);
    this._store.dispatch(new CreateBucket({ name: 'Hello-123', boardId: defaultBoardId }));
  }
}
