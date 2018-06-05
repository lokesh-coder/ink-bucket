import { State, Action, StateContext, NgxsOnInit, Selector } from '@ngxs/store';
import { InkBoards } from '@lib/models';
import {
  FetchAllBoards,
  PopulateAllBoards,
  CreateBoard,
  AddBoard,
  DeleteBoard,
  RemoveBoard,
  DeleteAllBoards,
  RemoveAllBoards
} from '@store/actions';
import { InkBoardsService } from '@lib/services';

@State<InkBoards>({
  name: 'boards',
  defaults: []
})
export class BoardsState {
  @Selector()
  static defaultBoard(state: InkBoards) {
    return state[0]._id;
  }

  constructor(private _service: InkBoardsService) {}

  @Action(FetchAllBoards)
  fetchAllBoards(ctx: StateContext<InkBoards>, action: FetchAllBoards) {
    return this._service.fetchAllBoards().then(boards => {
      ctx.dispatch(new PopulateAllBoards(boards));
    });
  }

  @Action(PopulateAllBoards)
  populateAllBoards(ctx: StateContext<InkBoards>, action: PopulateAllBoards) {
    ctx.setState(action.boards);
  }

  @Action(CreateBoard)
  createBoard(ctx: StateContext<InkBoards>, action: CreateBoard) {
    return this._service.create(action.boardData).then(board => {
      ctx.dispatch(new AddBoard(board));
    });
  }

  @Action(AddBoard)
  addBoard(ctx: StateContext<InkBoards>, action: AddBoard) {
    const state = ctx.getState();
    ctx.setState([...state, action.boardData]);
  }

  @Action(DeleteBoard)
  deleteBoard(ctx: StateContext<InkBoards>, action: DeleteBoard) {}

  @Action(RemoveBoard)
  removeBoard(ctx: StateContext<InkBoards>, action: RemoveBoard) {}

  @Action(DeleteAllBoards)
  deleteAllBoards(ctx: StateContext<InkBoards>, action: DeleteAllBoards) {}

  @Action(RemoveAllBoards)
  removeAllBoards(ctx: StateContext<InkBoards>, action: RemoveAllBoards) {}
}
