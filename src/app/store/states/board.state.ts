import { State, Action, StateContext } from '@ngxs/store';
import { InkBoard, InkBoardMeta } from '../../models';
import { LoadInitialData } from '../actions/general.action';
import { UtilService } from '../../services/util.service';
import { CreateBoard, UpdateBoard, LoadBoard } from '../actions/board.actions';
import { DBService } from '../../services/db.service';

@State<InkBoard>({
  name: 'board',
  defaults: []
})
export class BoardState {
  constructor(private db: DBService, private util: UtilService) {}

  @Action(LoadBoard)
  loadBoard(ctx: StateContext<InkBoard>, action: LoadBoard) {
    ctx.setState(action.boards);
  }

  @Action(CreateBoard)
  createBoard(ctx: StateContext<InkBoard>, action: CreateBoard) {
    const state = ctx.getState();
    state.push({ ...action.boardData });
    ctx.setState([...state]);
  }

  @Action(UpdateBoard)
  updateBoard(ctx: StateContext<InkBoard>, action: UpdateBoard) {
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
