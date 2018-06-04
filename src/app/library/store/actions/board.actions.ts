import { InkBoardMeta } from '@lib/models';

export class PopulateBoards {
  static readonly type = '[Board] Load all boards from database';
  constructor() {}
}

export class CreateBoard {
  static readonly type = '[Board] Create new board';
  constructor(public boardData: InkBoardMeta) {}
}

export class ClearBoards {
  static readonly type = '[Board] Clear all boards';
}

export class UpdateBoard {
  static readonly type = '[Board] Update board';
  constructor(public boardData: InkBoardMeta) {}
}

export class DeleteBoard {
  static readonly type = '[Board] delete board';
  constructor(public boardData: InkBoardMeta) {}
}
