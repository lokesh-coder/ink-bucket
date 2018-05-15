import { State, Action, StateContext } from '@ngxs/store';
import { Ink } from '../../ink.model';
import { AddNewInk, UpdateInkColor } from '../actions/ink.action';

@State<Ink>({
  name: 'ink',
  defaults: []
})
export class InkState {
  @Action(AddNewInk)
  createBucket(ctx: StateContext<Ink>, action: AddNewInk) {
    const state = ctx.getState();
    state.push({ ...action.inkData, id: this.getID() });
    ctx.setState([...state]);
  }

  @Action(UpdateInkColor)
  updateInkColor(ctx: StateContext<Ink>, action: UpdateInkColor) {
    let state: any = ctx.getState();
    console.log('state', state);
    state = state.map((a: any) => {
      if (a.id === action.inkData.id) {
        a.value = action.inkData.value;
        a.meta = action.inkData.meta;
      }
      return a;
    });
    ctx.setState([...state]);
  }

  private getID() {
    return (
      Math.random()
        .toString(36)
        .substring(2, 5) +
      Math.random()
        .toString(36)
        .substring(2, 5)
    );
  }
}
