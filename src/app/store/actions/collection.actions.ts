import { InkAppView, InkCollection } from '../../ink.model';

export class CreateCollection {
  static readonly type = '[Collection] Create new collection';
  constructor(public collectionData: InkCollection) {}
}
