import { InkColor } from '../../models';

export class AddNewInk {
  static readonly type = '[Ink] Add new ink';
  constructor(public inkData: InkColor) {}
}

export class UpdateInkColor {
  static readonly type = '[Ink] Update color';
  constructor(public inkData: InkColor) {}
}
