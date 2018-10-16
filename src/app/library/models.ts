import { RxDatabase, RxDocument, RxCollection } from 'rxdb';

export enum DropType {
  RGB,
  HEX,
  HSL
}

export interface User {
  id: string;
  email?: string;
  displayName?: string;
  isAnonymous: boolean;
  photoURL?: string;
}

export interface InkBoardMeta {
  createdby: string; // update
  name?: string;
  id: string;
  description?: string;
  createdAt: number;
}
export interface InkBucketMeta {
  id: string;
  createdby?: string;
  name?: string;
  description?: string;
  boardId: string;
}
export interface InkDropMeta {
  createdby?: string; // update
  name?: string;
  id?: string;
  description?: string;
  meta: any;
  displayValue: string;
  bucketId: string;
  createdAt?: number;
  updatedAt?: number;
}
export interface InkSettingsMeta {
  key: string;
  value: any;
  _id?: string;
}

export type InkBuckets = InkBucketMeta[];
export type InkDrops = InkDropMeta[];
export type InkBoards = InkBoardMeta[];

export enum InkAppView {
  ROUND,
  RECT,
  STRIP
}
export type InkAppSettings = InkAppSettingsItem[];

export interface InkAppSettingsItem {
  key: string;
  value: any;
}

/* doc methods */
export interface InkDocMethods {
  log(): any;
}

/* documents */
export type InkBoardDoc = RxDocument<InkBoardMeta, InkDocMethods>;
export type InkBucketDoc = RxDocument<InkBucketMeta, InkDocMethods>;
export type InkDropDoc = RxDocument<InkDropMeta, InkDocMethods>;
export type InkSettingsDoc = RxDocument<InkSettingsMeta, InkDocMethods>;
/* collections */
export interface InkBoardColl extends RxCollection<InkBoardMeta, InkDocMethods> {}
export interface InkBucketColl extends RxCollection<InkBucketMeta, InkDocMethods> {}
export interface InkDropColl extends RxCollection<InkDropMeta, InkDocMethods> {}
export interface InkSettingsColl extends RxCollection<InkSettingsMeta, InkDocMethods> {}
/* database */
export interface InkDb extends RxDatabase {
  boards?: InkBoardColl;
  drops?: InkDropColl;
  buckets?: InkBucketColl;
  settings?: InkSettingsColl;
}

export interface InkGist {
  url: string;
  id: string;
  owner_img: string;
  owner_name: string;
  owner_profile: string;
}

export type InkView = 'THIN' | 'DEFAULT' | 'CIRCLE';
