import { State, Action, StateContext } from '@ngxs/store';
import { InkBoard, InkBoardMeta } from '../../models';
import { LoadInitialData } from '../actions/general.action';
import { UtilService } from '../../services/util.service';
import { CreateBoard, UpdateBoard } from '../actions/board.actions';
import { DBService } from '../../services/db.service';

@State<InkBoard>({
  name: 'board',
  defaults: []
})
export class BoardState {
  constructor(private db: DBService, private util: UtilService) {}

  @Action(CreateBoard)
  createBoard(ctx: StateContext<InkBoard>, action: CreateBoard) {
    const state = ctx.getState();
    state.push({ ...action.boardData, id: this.util.ID });
    ctx.setState([...state]);
    this.db.saveDocument('board', state);
  }

  @Action(UpdateBoard)
  updateBoard(ctx: StateContext<InkBoard>, action: UpdateBoard) {
    let state: any = ctx.getState();
    state = state.map((a: any) => {
      if (a.id === action.boardData.id) {
        a.name = action.boardData.name;
      }
      return a;
    });
    ctx.setState([...state]);
    this.db.updateDocument('board', { id: action.boardData.id }, action.boardData);
  }

  @Action(LoadInitialData)
  loadBoardData(ctx: StateContext<InkBoard>, action: LoadInitialData) {
    if (action.db !== 'board') {
      return;
    }
    const defaultData = {
      id: this.util.ID,
      created: new Date(),
      name: 'Default'
    };
    const data = action.value.length === 0 ? defaultData : action.value;
    ctx.setState(data);
    this.db.saveDocument('board', data);
  }
}
