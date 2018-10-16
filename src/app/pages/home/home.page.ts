import { Component, OnDestroy, OnInit } from '@angular/core';
import { InkBoardMeta } from '@lib/models';
import { Select, Store } from '@ngxs/store';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';
import { FetchAllBoards, FetchAllBuckets, FetchAllDrops, RemoveAllBuckets, RemoveAllDrops, SaveUser } from '@store/actions';
import { BoardsState } from '@store/states';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'inkapp-home-page',
  templateUrl: './home.page.html'
})
export class HomePage implements OnInit, OnDestroy {
  @Select(BoardsState) boards$: Observable<InkBoardMeta[]>;
  constructor(private _store: Store, private _authService: AuthService, private _userService: UserService) {
    this._authService.auth().onAuthStateChanged((user) => {
      if (user) {
        this._userService.updateUserData(user);
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
