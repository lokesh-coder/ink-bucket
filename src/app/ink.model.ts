export enum InkColorType {
  RGB,
  HEX,
  HSL
}

export interface InkBucketMeta {
  id: number;
  name: string;
  collectionId: number;
}

export type InkBucket = InkBucketMeta[];

export interface InkColor {
  id?: string;
  name?: string;
  value: string;
  meta: any;
  bucketId: number;
}

export type Ink = InkColor[];

export interface InkCollectionMeta {
  id: number;
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
