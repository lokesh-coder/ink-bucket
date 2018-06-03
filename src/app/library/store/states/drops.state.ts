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
  async ngxsOnInit(ctx: StateContext<InkDrops>) {
    const drops = await this._service.getAll();
    ctx.setState(drops);
  }
  @Action(AddDrop)
  addDrop(ctx: StateContext<InkDrops>, action: AddDrop) {
    const state = ctx.getState();
    this._service.create(action.bucketId, action.inkData).then((doc: any) => {
      state.push(doc);
      ctx.setState([...state]);
    });
  }

  @Action(UpdateDrop)
  updateDrop(ctx: StateContext<InkDrops>, action: UpdateDrop) {
    const state: any = ctx.getState();
    this._service.update(action.id, action.inkData).then(doc => {
      const newState = state.map(c => (c._id === action.id ? action.inkData : c));
      ctx.setState([...newState]);
    });
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
