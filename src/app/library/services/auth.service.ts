import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {from, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _afAuth: AngularFireAuth) {}
  auth(): auth.Auth {
    return this._afAuth.auth;
  }
  loginAnonymously(): Observable<auth.UserCredential> {
    return from(this._afAuth.auth.signInAnonymously());
  }
  googleLogin(): Observable<auth.UserCredential> {
    return from(this._afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()));
  }
  logout() {
    this._afAuth.auth.signOut();
  }
  isUserLogged() {
    return this._afAuth.auth.currentUser;
  }
  get userInfo() {
    return this._afAuth.user.pipe(map(({displayName, email, isAnonymous, photoURL, uid}) => ({uid, displayName, photoURL, email})));
  }
}
