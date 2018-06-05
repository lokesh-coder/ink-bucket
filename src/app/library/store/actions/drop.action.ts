import { InkDropMeta, InkDrops } from '@lib/models';

/* fetch all drops from database */
export class FetchAllDrops {
  static readonly type = '[Drop] fetch all drops from database';
  constructor() {}
}
/* populate all drops */
export class PopulateAllDrops {
  static readonly type = '[Drop] populate all drops';
  constructor(public drops: InkDrops) {}
}

/* update drop */
export class UpdateDrop {
  static readonly type = '[Drop] update drop';
  constructor(public dropData: InkDropMeta) {}
}
/* patch drops */
export class PatchDrop {
  static readonly type = '[Drop] patch drop';
  constructor(public dropData: Partial<InkDropMeta>) {}
}

/* create drop */
export class CreateDrop {
  static readonly type = '[Drop] create drop';
  constructor(public dropData: InkDropMeta) {}
}
/* add drop */
export class AddDrop {
  static readonly type = '[Drop] add drop';
  constructor(public dropData: InkDropMeta) {}
}

/* delete drop */
export class DeleteDrop {
  static readonly type = '[Drop] delete drop';
  constructor(public dropId: string) {}
}
/* remove drop */
export class RemoveDrop {
  static readonly type = '[Drop] remove drop';
  constructor(public dropId: string) {}
}

/* delete all drops */
export class DeleteAllDrops {
  static readonly type = '[Drop] delete all drops';
}
/* remove all drops */
export class RemoveAllDrops {
  static readonly type = '[Drop] remove all drops';
}

/* delete drops under bucket */
export class DeleteDropsUnderBucket {
  static readonly type = '[Drop] delete drops under bucket ';
  constructor(public bucketId: string) {}
}

/* remove drops under bucket */
export class RemoveDropsUnderBucket {
  static readonly type = '[Drop] remove drops under bucket ';
  constructor(public bucketId: string) {}
}
