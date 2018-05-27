import { InkColorMeta } from '../../models';

export class AddInkColor {
  static readonly type = '[Ink] Add new ink';
  constructor(public bucketId: string, public inkData: InkColorMeta) {}
}

export class UpdateInkColor {
  static readonly type = '[Ink] Update color';
  constructor(public id: string, public inkData: InkColorMeta) {}
}

export class LoadInkColorsInBucket {
  static readonly type = '[Ink] get colors in bucket';
  constructor(public colors: InkColorMeta[]) {}
}
