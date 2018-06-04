import { State, Action, StateContext } from '@ngxs/store';
import { InkDrops } from '@lib/models';
import { AddDrop, UpdateDrop, DeleteDrop, ClearDrops, PopulateDrops } from '@store/actions';
import { InkDropsService } from '@lib/services';

@State<InkDrops>({
  name: 'drops',
  defaults: []
})
export class DropsState {
  constructor(private _service: InkDropsService) {}

  @Action(AddDrop)
  addDrop(ctx: StateContext<InkDrops>, action: AddDrop) {
    return this._service.create(action.bucketId, action.inkData).then((doc: any) => {
      const state = ctx.getState();
      ctx.setState([...state, { ...action.inkData, bucketId: action.bucketId }]);
    });
  }

  @Action(UpdateDrop)
  updateDrop(ctx: StateContext<InkDrops>, action: UpdateDrop) {
    return this._service.update(action.id, action.inkData).then(doc => {
      const state: any = ctx.getState();
      console.log('first', state);
      console.log('incomming', action);
      const newState = state.map(c => (c._id === action.id ? doc : c));
      ctx.setState([...newState]);
    });
  }

  @Action(PopulateDrops)
  populateDrops(ctx: StateContext<InkDrops>, action: PopulateDrops) {
    return this._service.getAll().then(drops => {
      ctx.setState(drops);
    });
  }

  @Action(ClearDrops)
  clearDrops(ctx: StateContext<InkDrops>, action: ClearDrops) {
    return this._service.deleteAll().then(doc => {
      ctx.setState([]);
    });
  }
}
