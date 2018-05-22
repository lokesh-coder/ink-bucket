import {
  InkDbBoardCollection,
  InkDbInkCollection,
  InkDbBucketCollection,
  InkDbSettingsCollection
} from './inkdb.model';
import { RxDatabase } from 'rxdb';

export enum InkColorType {
  RGB,
  HEX,
  HSL
}

export interface InkBucketMeta {
  id?: string;
  name: string;
  boardId: string;
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

export interface InkBoardMeta {
  id: string;
  name: string;
  created: Date;
}

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

export interface InkDb extends RxDatabase {
  board?: InkDbBoardCollection;
  ink?: InkDbInkCollection;
  bucket?: InkDbBucketCollection;
  settings?: InkDbSettingsCollection;
}
