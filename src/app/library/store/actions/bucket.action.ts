import { InkBucketMeta, InkBuckets } from '@lib/models';

/* fetch all buckets from database */
export class FetchAllBuckets {
  static readonly type = '[bucket] fetch all buckets from database';
}
/* populate all buckets */
export class PopulateAllBuckets {
  static readonly type = '[Bucket] populate all buckets';
  constructor(public buckets: InkBuckets) {}
}

/* create bucket */
export class CreateBucket {
  static readonly type = '[Bucket] create bucket';
  constructor(public bucketData: InkBucketMeta) {}
}
/* add bucket */
export class AddBucket {
  static readonly type = '[Bucket] add bucket';
  constructor(public bucketData: InkBucketMeta) {}
}

/* delete bucket */
export class DeleteBucket {
  static readonly type = '[Bucket] delete bucket';
  constructor(public bucketId: string) {}
}
/* remove bucket */
export class RemoveBucket {
  static readonly type = '[Bucket] remove bucket';
  constructor(public bucketId: string) {}
}

/* delete all buckets */
export class DeleteAllBuckets {
  static readonly type = '[Bucket] delete all buckets';
}
/* remove all buckets */
export class RemoveAllBuckets {
  static readonly type = '[Bucket] remove all buckets';
}

/* delete buckets under board */
export class DeleteBucketsUnderBoard {
  static readonly type = '[Bucket] delete buckets under board';
  constructor(public boardId: string) {}
}
/* remove buckets under board */
export class RemoveBucketsUnderBoard {
  static readonly type = '[Bucket] remove buckets under board';
  constructor(public boardId: string) {}
}

/* update bucket  */
export class UpdateBucket {
  static readonly type = '[Bucket] update bucket ';
  constructor(public bucketData: Partial<InkBucketMeta>) {}
}
/* patch bucket */
export class PatchBucket {
  static readonly type = '[Bucket] patch bucket ';
  constructor(public bucketData: Partial<InkBucketMeta>) {}
}
