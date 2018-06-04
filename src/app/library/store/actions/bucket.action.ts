import { InkBucketMeta } from '@lib/models';

export class CreateBucket {
  static readonly type = '[Bucket] Create new bucket';
  constructor(public bucketData: InkBucketMeta) {}
}
export class UpdateBucket {
  static readonly type = '[Bucket] Update bucket';
  constructor(public bucketData: InkBucketMeta) {}
}

export class PopulateBuckets {
  static readonly type = '[Bucket] Load all buckets';
  constructor() {}
}

export class RenameBucket {
  static readonly type = '[Bucket] Change name';
  constructor(public id: string, public name: string) {}
}

export class ClearBuckets {
  static readonly type = '[Bucket] Clear buckets';
  constructor() {}
}

export class DeleteBucket {
  static readonly type = '[Bucket] Delete';
  constructor(public bucketId: string) {}
}
