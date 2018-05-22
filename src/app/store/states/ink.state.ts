import { State, Action, StateContext } from '@ngxs/store';
import { Ink } from '../../models';
import { AddNewInk, UpdateInkColor } from '../actions/ink.action';
import { LoadInitialData } from '../actions/general.action';
import { DBService } from '../../services/db.service';
import { UtilService } from '../../services/util.service';

@State<Ink>({
  name: 'ink',
  defaults: []
})
export class InkState {
  constructor(private db: DBService, private util: UtilService) {}
  @Action(AddNewInk)
  createBucket(ctx: StateContext<Ink>, action: AddNewInk) {
    const state = ctx.getState();
    state.push({ ...action.inkData, id: this.util.ID });
    ctx.setState([...state]);
    this.db.saveDocument('ink', state);
  }

  @Action(UpdateInkColor)
  updateInkColor(ctx: StateContext<Ink>, action: UpdateInkColor) {
    let state: any = ctx.getState();
    state = state.map((a: any) => {
      if (a.id === action.inkData.id) {
        a.value = action.inkData.value;
        a.bucketId = action.inkData.bucketId;
        a.meta = action.inkData.meta;
      }
      return a;
    });
    ctx.setState([...state]);
    this.db.updateDocument('ink', { id: action.inkData.id }, action.inkData);
  }

  @Action(LoadInitialData)
  loadInkData(ctx: StateContext<Ink>, action: LoadInitialData) {
    if (action.db !== 'ink') {
      return;
    }
    ctx.setState(action.value);
    this.db.saveDocument('ink', action.value);
  }
}
