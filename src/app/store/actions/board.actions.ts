import { InkAppView, InkBoard, InkBoardMeta } from '../../models';

export class LoadBoard {
  static readonly type = '[Board] Load all boards';
  constructor(public boards: InkBoardMeta[]) {}
}
export class CreateBoard {
  static readonly type = '[Board] Create new board';
  constructor(public boardData: InkBoardMeta) {}
}

export class UpdateBoard {
  static readonly type = '[Board] Update board';
  constructor(public boardData: InkBoardMeta) {}
}
