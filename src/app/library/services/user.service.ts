import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _userSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  updateUserData(data): void {
    const {displayName, email, isAnonymous, photoURL, uid} = data;
    this._userSubject.next({displayName, email, isAnonymous, photoURL, id: uid});
  }
  getUserData() {
    return this._userSubject.getValue();
  }
}
