import { State, Action, StateContext } from '@ngxs/store';
import { InkBoards } from '@lib/models';
import { PopulateBoards, CreateBoard, UpdateBoard } from '@store/actions';

@State<InkBoards>({
  name: 'boards',
  defaults: []
})
export class BoardsState {
  constructor() {}

  @Action(PopulateBoards)
  loadBoard(ctx: StateContext<InkBoards>, action: PopulateBoards) {
    ctx.setState(action.boards);
  }

  @Action(CreateBoard)
  createBoard(ctx: StateContext<InkBoards>, action: CreateBoard) {
    const state = ctx.getState();
    state.push({ ...action.boardData });
    ctx.setState([...state]);
  }

  @Action(UpdateBoard)
  updateBoard(ctx: StateContext<InkBoards>, action: UpdateBoard) {
    let state: any = ctx.getState();
    state = state.map((a: any) => {
      if (a.id === action.boardData._id) {
        a.name = action.boardData.name;
      }
      return a;
    });
    ctx.setState([...state]);
  }
}
