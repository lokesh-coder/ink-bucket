import { State, Action, StateContext } from '@ngxs/store';
import { Ink } from '../../models';
import { UpdateInkColor, AddInkColor, LoadInkColorsInBucket, ClearInkColors } from '../actions/ink.action';
import { LoadInitialData } from '../actions/general.action';
import { DBService } from '../../services/db.service';
import { UtilService } from '../../services/util.service';

@State<Ink>({
  name: 'ink',
  defaults: []
})
export class InkState {
  constructor(private db: DBService, private util: UtilService) {}
  @Action(AddInkColor)
  addInkColor(ctx: StateContext<Ink>, action: AddInkColor) {
    const state = ctx.getState();
    state.push(action.inkData);
    ctx.setState([...state]);
  }

  @Action(UpdateInkColor)
  updateInkColor(ctx: StateContext<Ink>, action: UpdateInkColor) {
    const state: any = ctx.getState();
    const newState = state.map(c => {
      if (c._id === action.id) {
        return action.inkData;
      }
      return c;
    });
    ctx.setState([...newState]);
  }
  @Action(LoadInkColorsInBucket)
  loadInkColorsInBucket(ctx: StateContext<Ink>, action: LoadInkColorsInBucket) {
    const state: any = ctx.getState();
    ctx.setState([...state, ...action.colors]);
  }
  @Action(ClearInkColors)
  clearBuckets(ctx: StateContext<Ink>, action: ClearInkColors) {
    ctx.setState([]);
  }
}
