import { State, Action, StateContext } from '@ngxs/store';
import { InkDrops } from '@lib/models';
import { AddDrop, UpdateDrop, DeleteDrop, ClearDrops, PopulateDrops } from '@store/actions';

@State<InkDrops>({
  name: 'drops',
  defaults: []
})
export class DropsState {
  constructor() {}
  @Action(AddDrop)
  addDrop(ctx: StateContext<InkDrops>, action: AddDrop) {
    const state = ctx.getState();
    state.push(action.inkData);
    ctx.setState([...state]);
  }

  @Action(UpdateDrop)
  updateDrop(ctx: StateContext<InkDrops>, action: UpdateDrop) {
    const state: any = ctx.getState();
    const newState = state.map(c => {
      if (c._id === action.id) {
        return action.inkData;
      }
      return c;
    });
    ctx.setState([...newState]);
  }

  @Action(PopulateDrops)
  loadBoard(ctx: StateContext<InkDrops>, action: PopulateDrops) {
    ctx.setState(action.drops);
  }

  @Action(ClearDrops)
  clearBuckets(ctx: StateContext<InkDrops>, action: ClearDrops) {
    ctx.setState([]);
  }
}
