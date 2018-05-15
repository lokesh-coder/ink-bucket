import { InkBucket, InkBucketMeta } from '../../ink.model';

export class CreateBucket {
  static readonly type = '[Bucket] Create new bucket';
  constructor(public bucketData: InkBucketMeta) {}
}
