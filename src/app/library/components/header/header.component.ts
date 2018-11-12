import { Component } from '@angular/core';
import { InkBucketsService } from '@lib/services';
import { Store } from '@ngxs/store';
import { BUCKET_DEFAULT_NAME } from '@root/ink.config';
import { AuthService } from '@services/auth.service';
import { CreateBucket, ResetUser } from '@store/actions';
import { BoardsState } from '@store/states';

@Component({
  selector: 'inkapp-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  currentBoardId: string;
  constructor(public auth: AuthService, private _store: Store, private _bucketService: InkBucketsService) {}
  newBucket() {
    const defaultBoardId = this._store.selectSnapshot(BoardsState.defaultBoard);
    this._store.dispatch(new CreateBucket({ name: BUCKET_DEFAULT_NAME, boardId: defaultBoardId }));
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
