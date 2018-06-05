import { State, Action, StateContext } from '@ngxs/store';
import { InkDrops } from '@lib/models';
import {
  FetchAllDrops,
  PopulateAllDrops,
  UpdateDrop,
  PatchDrop,
  CreateDrop,
  AddDrop,
  DeleteDrop,
  RemoveDrop,
  DeleteAllDrops,
  RemoveAllDrops,
  DeleteDropsUnderBucket,
  RemoveDropsUnderBucket
} from '@store/actions';
import { InkDropsService } from '@lib/services';

@State<InkDrops>({
  name: 'drops',
  defaults: []
})
export class DropsState {
  constructor(private _service: InkDropsService) {}

  @Action(FetchAllDrops)
  fetchAllDrops(ctx: StateContext<InkDrops>, action: FetchAllDrops) {
    return this._service.getAll().then(drops => {
      ctx.dispatch(new PopulateAllDrops(drops));
    });
  }

  @Action(PopulateAllDrops)
  populateAllDrops(ctx: StateContext<InkDrops>, action: PopulateAllDrops) {
    ctx.setState(action.drops);
  }

  @Action(UpdateDrop)
  ppdateDrop(ctx: StateContext<InkDrops>, action: UpdateDrop) {
    return this._service.update(action.dropData).then(drop => {
      ctx.dispatch(new PatchDrop((drop as any)._data));
    });
  }

  @Action(PatchDrop)
  patchDrop(ctx: StateContext<InkDrops>, action: PatchDrop) {
    const state: any = ctx.getState();
    const newState = state.map(c => (c._id === action.dropData._id ? action.dropData : c));
    ctx.setState([...newState]);
  }

  @Action(CreateDrop)
  createDrop(ctx: StateContext<InkDrops>, action: CreateDrop) {
    return this._service.create(action.dropData).then(drop => {
      console.log('retrive', drop);
      ctx.dispatch(new AddDrop((drop as any)._data));
    });
  }

  @Action(AddDrop)
  addDrop(ctx: StateContext<InkDrops>, action: AddDrop) {
    const state = ctx.getState();
    ctx.setState([...state, action.dropData]);
  }

  @Action(DeleteDrop)
  deleteDrop(ctx: StateContext<InkDrops>, action: DeleteDrop) {
    this._service.delete(action.dropId).then(_ => {
      ctx.dispatch(new RemoveDrop(action.dropId));
    });
  }

  @Action(RemoveDrop)
  removeDrop(ctx: StateContext<InkDrops>, action: RemoveDrop) {
    const state: any = ctx.getState();
    const newState = state.filter(b => b._id !== action.dropId);
    ctx.setState(newState);
  }

  @Action(DeleteAllDrops)
  deleteAllDrops(ctx: StateContext<InkDrops>, action: DeleteAllDrops) {
    return this._service.deleteAll().then(_ => {
      ctx.dispatch(new RemoveAllDrops());
    });
  }

  @Action(RemoveAllDrops)
  removeAllDrops(ctx: StateContext<InkDrops>, action: RemoveAllDrops) {
    ctx.setState([]);
  }

  @Action(DeleteDropsUnderBucket)
  deleteDropsUnderBucket(ctx: StateContext<InkDrops>, action: DeleteDropsUnderBucket) {
    return this._service.deleteAllUnderBucket(action.bucketId).then(bucket => {
      ctx.dispatch(new RemoveDropsUnderBucket(action.bucketId));
    });
  }

  @Action(RemoveDropsUnderBucket)
  removeDropsUnderBucket(ctx: StateContext<InkDrops>, action: RemoveDropsUnderBucket) {
    const state: any = ctx.getState();
    const newState = state.filter(b => b.bucketId !== action.bucketId);
    ctx.setState(newState);
  }
}
