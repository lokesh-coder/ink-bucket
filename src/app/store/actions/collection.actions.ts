import { InkAppView, InkCollection, InkCollectionMeta } from '../../ink.model';

export class CreateCollection {
  static readonly type = '[Collection] Create new collection';
  constructor(public collectionData: InkCollectionMeta) {}
}

export class UpdateCollection {
  static readonly type = '[Collection] Update collection';
  constructor(public collectionData: InkCollectionMeta) {}
}
