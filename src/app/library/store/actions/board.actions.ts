import { InkBoardMeta, InkBoards } from '@lib/models';

/* fetch all boards from database */
export class FetchAllBoards {
  static readonly type = '[Board] fetch all boards from database';
}
/* populate boards */
export class PopulateAllBoards {
  static readonly type = '[Board] populate boards';
  constructor(public boards: InkBoards) {}
}

/* create board */
export class CreateBoard {
  static readonly type = '[Board] create board';
  constructor(public boardData: InkBoardMeta) {}
}
/* add new board */
export class AddBoard {
  static readonly type = '[Board] add board';
  constructor(public boardData: InkBoardMeta) {}
}

/* delete board */
export class DeleteBoard {
  static readonly type = '[Board] delete board';
  constructor(public boardId: string) {}
}
/* remove board */
export class RemoveBoard {
  static readonly type = '[Board] remove board';
  constructor(public boardId: string) {}
}

/* delete all boards */
export class DeleteAllBoards {
  static readonly type = '[Board] delete all boards';
}
/* remove all boards */
export class RemoveAllBoards {
  static readonly type = '[Board] remove all boards';
}
