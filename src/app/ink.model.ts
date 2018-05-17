export enum InkColorType {
  RGB,
  HEX,
  HSL
}

export interface InkBucketMeta {
  id?: string;
  name: string;
  collectionId: string;
}

export type InkBucket = InkBucketMeta[];

export interface InkColor {
  id?: string;
  name?: string;
  value: string;
  meta: any;
  bucketId: string;
}

export type Ink = InkColor[];

export interface InkCollectionMeta {
  id: string;
  name: string;
  created: Date;
}

export type InkCollection = InkCollectionMeta[];

export enum InkAppView {
  ROUND,
  RECT,
  STRIP
}
export interface InkAppSettings {
  view: InkAppView;
  sortBy: string;
}
