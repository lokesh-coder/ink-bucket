import { InkBucket, InkBucketMeta } from '../../ink.model';

export class LoadInitialData {
  static readonly type = '[General] Load initial data';
  constructor(public db: string, public value: any) {}
}
