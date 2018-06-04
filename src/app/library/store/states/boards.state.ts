import { State, Action, StateContext, NgxsOnInit, Selector } from '@ngxs/store';
import { InkBoards } from '@lib/models';
import { PopulateBoards, CreateBoard, UpdateBoard, PopulateBoardsFromDb } from '@store/actions';
import { InkBoardsService } from '@lib/services';

@State<InkBoards>({
  name: 'boards',
  defaults: []
})
export class BoardsState implements NgxsOnInit {
  @Selector()
  static defaultBoard(state: InkBoards) {
    return state[0]._id;
  }

  constructor(private _service: InkBoardsService) {}
  ngxsOnInit(ctx: StateContext<InkBoards>) {}

  @Action(PopulateBoards)
  populateBoards(ctx: StateContext<InkBoards>) {
    return this._service.getBoards().then(boards => {
      ctx.setState(boards);
    });
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
