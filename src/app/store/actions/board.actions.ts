import { InkAppView, InkBoard, InkBoardMeta } from '../../models';

export class CreateBoard {
  static readonly type = '[Board] Create new board';
  constructor(public boardData: InkBoardMeta) {}
}

export class UpdateBoard {
  static readonly type = '[Board] Update board';
  constructor(public boardData: InkBoardMeta) {}
}
