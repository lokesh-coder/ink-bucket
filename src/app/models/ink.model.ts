import { RxDatabase, RxDocument, RxCollection } from 'rxdb';

export enum InkColorType {
  RGB,
  HEX,
  HSL
}

export interface InkBoardMeta {
  name?: string;
  _id?: string;
  description?: string;
  createdAt?: string;
}
export interface InkBucketMeta {
  name?: string;
  _id?: string;
  description?: string;
  boardId: string;
}
export interface InkColorMeta {
  name?: string;
  _id?: string;
  description?: string;
  meta: any;
  displayValue: string;
  bucketId: string;
}
export interface InkSettingsMeta {
  key: string;
  _id?: string;
  value: string;
}

export type InkBucket = InkBucketMeta[];
export type Ink = InkColorMeta[];
export type InkBoard = InkBoardMeta[];

export enum InkAppView {
  ROUND,
  RECT,
  STRIP
}
export interface InkAppSettings {
  view: InkAppView;
  sortBy: string;
}

/* doc methods */
export interface InkDocMethods {
  log(): any;
}

/* documents */
export type InkBoardDoc = RxDocument<InkBoardMeta, InkDocMethods>;
export type InkBucketDoc = RxDocument<InkBucketMeta, InkDocMethods>;
export type InkInkDoc = RxDocument<InkColorMeta, InkDocMethods>;
export type InkSettingsDoc = RxDocument<InkSettingsMeta, InkDocMethods>;
/* collections */
export interface InkBoardColl extends RxCollection<InkBoardMeta, InkDocMethods> {}
export interface InkBucketColl extends RxCollection<InkBucketMeta, InkDocMethods> {}
export interface InkInkColl extends RxCollection<InkColorMeta, InkDocMethods> {}
export interface InkSettingsColl extends RxCollection<InkSettingsMeta, InkDocMethods> {}
/* database */
export interface InkDb extends RxDatabase {
  board?: InkBoardColl;
  ink?: InkInkColl;
  bucket?: InkBucketColl;
  settings?: InkSettingsColl;
}
