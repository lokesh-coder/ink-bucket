import { BoardSchema } from '@lib/database/board.schema';
import { BucketSchema } from '@lib/database/bucket.schema';
import { DropSchema } from '@lib/database/drop.schema';
import { SettingsSchema } from '@lib/database/settings.schema';

export const collections = [
  {
    name: 'boards',
    schema: BoardSchema,
    sync: true
  },
  {
    name: 'buckets',
    schema: BucketSchema,
    sync: true
  },
  {
    name: 'drops',
    schema: DropSchema,
    sync: true
  },
  {
    name: 'settings',
    schema: SettingsSchema,
    sync: true
  }
];
