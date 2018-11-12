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
  createdBy: string;
  name?: string;
  id: string;
  description?: string;
  createdAt: number;
}

export interface InkBucketMeta {
  id: string;
  createdBy: string;
  name?: string;
  description?: string;
  boardId: string;
  createdAt?: number;
}

export interface InkDropMeta {
  createdBy: string;
  name?: string;
  id: string;
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

export type InkView = 'THIN' | 'DEFAULT' | 'CIRCLE';
