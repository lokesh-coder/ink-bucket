import { InkBucket, InkBucketMeta } from '../../models';

export class CreateBucket {
  static readonly type = '[Bucket] Create new bucket';
  constructor(public bucketData: InkBucketMeta) {}
}
export class UpdateBucket {
  static readonly type = '[Bucket] Update bucket';
  constructor(public bucketData: InkBucketMeta) {}
}

export class LoadBuckets {
  static readonly type = '[Bucket] Load all buckets';
  constructor(public buckets: InkBucketMeta[]) {}
}

export class RenameBucket {
  static readonly type = '[Bucket] Change name';
  constructor(public id: string, public name: string) {}
}
