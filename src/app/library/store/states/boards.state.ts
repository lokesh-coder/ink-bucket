import { InkBoards } from '@lib/models';
import { InkBoardsService } from '@lib/services';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AddBoard, CreateBoard, DeleteAllBoards, DeleteBoard, FetchAllBoards, PopulateAllBoards, RemoveAllBoards, RemoveBoard } from '@store/actions';
import { map, tap } from 'rxjs/operators';

@State<InkBoards>({
  name: 'boards',
  defaults: []
})
export class BoardsState {
  @Selector()
  static defaultBoard(state: InkBoards) {
    return state[0].id;
  }

  constructor(private _service: InkBoardsService) {}

  @Action(FetchAllBoards)
  fetchAllBoards(ctx: StateContext<InkBoards>, action: FetchAllBoards) {
    return this._service.fetchAllBoards().pipe(map(boards => {
      ctx.dispatch(new PopulateAllBoards(boards));
    }));
  }

  @Action(PopulateAllBoards)
  populateAllBoards(ctx: StateContext<InkBoards>, action: PopulateAllBoards) {
    ctx.setState(action.boards);
  }

  @Action(CreateBoard)
  createBoard(ctx: StateContext<InkBoards>, action: CreateBoard) {
    return this._service.createIfNot(action.boardData).pipe(tap(_ => ctx.dispatch(new AddBoard(action.boardData))));
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
