import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { filter, map } from 'rxjs/operators';
import { InkBoardMeta } from '@lib/models';
import { InkBoardsService, InkDatabaseService } from '@lib/services';
import { FetchAllBoards, FetchAllBuckets, FetchAllDrops, RemoveAllBuckets, RemoveAllDrops, SaveUser } from '@store/actions';
import { BoardsState } from '@store/states';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'inkapp-home-page',
  templateUrl: './home.page.html'
})
export class HomePage implements OnInit, OnDestroy {
  @Select(BoardsState) boards$: Observable<InkBoardMeta[]>;
  constructor(private _store: Store, private _authService: AuthService) {
    this._authService.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('user', user);
        this._store.dispatch(new SaveUser({
          id: user.uid,
          isAnonymous: user.isAnonymous,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        }));
      } else {
        console.log('err', user);
      }
    });
  }

  ngOnInit() {
    // this._authService.loginAnonymously().subscribe(user => {
    //   console.log('sub', user);
    // });
    this._store.dispatch(new FetchAllBoards());
    this._store.dispatch(new FetchAllBuckets());
    this._store.dispatch(new FetchAllDrops());
  }

  ngOnDestroy() {
    this._store.dispatch(new RemoveAllBuckets());
    this._store.dispatch(new RemoveAllDrops());
  }
}
