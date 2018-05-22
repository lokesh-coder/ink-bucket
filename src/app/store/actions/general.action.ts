import { InkBucket, InkBucketMeta } from '../../models';

export class LoadInitialData {
  static readonly type = '[General] Load initial data';
  constructor(public db: string, public value: any) {}
}
