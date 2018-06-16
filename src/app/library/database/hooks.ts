import { InkDropMeta } from '@lib/models';

export const DropPreInsertHook = (doc: InkDropMeta) => {
  doc.createdAt = Date.now();
};
export const DropPreSaveHook = (doc: InkDropMeta) => {
  doc.updatedAt = Date.now();
};
