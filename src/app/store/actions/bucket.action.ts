import { InkBucket, InkBucketMeta } from '../../models';

export class CreateBucket {
  static readonly type = '[Bucket] Create new bucket';
  constructor(public bucketData: InkBucketMeta) {}
}
export class UpdateBucket {
  static readonly type = '[Ink] Update bucket';
  constructor(public bucketData: InkBucketMeta) {}
}
