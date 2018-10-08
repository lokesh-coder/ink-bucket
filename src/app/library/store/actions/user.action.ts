import { User } from '@lib/models';

export class SaveUser {
  static readonly type = '[User] save user';
  constructor(public userData: User) {}
}
export class UpdateUser {
  static readonly type = '[User] update user';
  constructor(public userData: User) {}
}
export class ResetUser {
  static readonly type = '[User] reset user';
}
