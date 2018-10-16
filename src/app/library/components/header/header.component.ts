import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { map, tap, filter } from 'rxjs/operators';
import { InkBucketsService } from '@lib/services';
import { CreateBucket, ResetUser } from '@store/actions';
import { BoardsState } from '@store/states';
import { DEFAULT_BUCKET_NAME } from '@root/ink.config';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'inkapp-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  currentBoardId: string;
  constructor(public auth: AuthService, private _store: Store, private _bucketService: InkBucketsService) {}
  newBucket() {
    const defaultBoardId = this._store.selectSnapshot(BoardsState.defaultBoard);
    this._store.dispatch(new CreateBucket({ name: DEFAULT_BUCKET_NAME, boardId: defaultBoardId, id: null }));
  }
  googleLogin() {
    this.auth.googleLogin().subscribe(user => {
      console.log('gogole login', user);
    });
  }
  logout() {
    this._store.dispatch(new ResetUser());
  }
}
