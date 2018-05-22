import { RxDocument, RxCollection, RxDatabase } from 'rxdb';
import { Observable } from 'rxjs';

/* doc types */
export interface InkDbBoardDocumentType {
  name?: string;
  id?: string;
  description?: number;
}
export interface InkDbBucketDocumentType {
  name?: string;
  id?: string;
  description?: number;
}
export interface InkDbInkDocumentType {
  name?: string;
  id?: string;
  description?: number;
}
export interface InkDbSettingsDocumentType {
  name?: string;
  id?: string;
  description?: number;
}

/* doc methods */
export interface InkDbBoardOrmMethods {
  log(): any;
}
export interface InkDbBucketOrmMethods {
  log(): any;
}
export interface InkDbInkOrmMethods {
  log(): any;
}
export interface InkDbSettingsOrmMethods {
  log(): any;
}

/* documenst */
export type InkDbBoardDocument = RxDocument<InkDbBoardDocumentType, InkDbBoardOrmMethods>;
export type InkDbBucketDocument = RxDocument<InkDbBucketDocumentType, InkDbBucketOrmMethods>;
export type InkDbInkDocument = RxDocument<InkDbInkDocumentType, InkDbInkOrmMethods>;
export type InkDbSettingsDocument = RxDocument<InkDbSettingsDocumentType, InkDbSettingsOrmMethods>;

/* collection */
export interface InkDbBoardCollection extends RxCollection<InkDbBoardDocumentType, InkDbBoardOrmMethods> {}

export interface InkDbBucketCollection extends RxCollection<InkDbBucketDocumentType, InkDbBucketOrmMethods> {}

export interface InkDbInkCollection extends RxCollection<InkDbInkDocumentType, InkDbInkOrmMethods> {}

export interface InkDbSettingsCollection extends RxCollection<InkDbSettingsDocumentType, InkDbSettingsOrmMethods> {}
