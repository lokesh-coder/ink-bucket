import { InkDropMeta } from '@lib/models';

export class AddDrop {
  static readonly type = '[Drop] Add new ink';
  constructor(public bucketId: string, public inkData: InkDropMeta) {}
}

export class UpdateDrop {
  static readonly type = '[Drop] Update color';
  constructor(public id: string, public inkData: InkDropMeta) {}
}

export class PopulateDrops {
  static readonly type = '[Drop] get colors in bucket';
  constructor(public drops: InkDropMeta[]) {}
}
export class DeleteDrop {
  static readonly type = '[Drop] delete';
  constructor(public id: string) {}
}

export class ClearDrops {
  static readonly type = '[Drop] clear all';
}
