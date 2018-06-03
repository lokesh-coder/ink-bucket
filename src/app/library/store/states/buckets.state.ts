import { State, Action, StateContext } from '@ngxs/store';
import { InkBuckets } from '@lib/models';
import { CreateBucket, UpdateBucket, PopulateBuckets, RenameBucket, DeleteBucket, ClearBuckets } from '@store/actions';

@State<InkBuckets>({
  name: 'buckets',
  defaults: []
})
export class BucketsState {
  constructor() {}

  @Action(CreateBucket)
  createBucket(ctx: StateContext<InkBuckets>, action: CreateBucket) {
    const state = ctx.getState();
    state.push({ ...action.bucketData });
    ctx.setState([...state]);
  }

  @Action(UpdateBucket)
  updateBucket(ctx: StateContext<InkBuckets>, action: UpdateBucket) {
    let state: any = ctx.getState();
    state = state.map((a: any) => {
      if (a.id === action.bucketData._id) {
        a.name = action.bucketData.name;
      }
      return a;
    });
    ctx.setState([...state]);
  }

  @Action(PopulateBuckets)
  loadBuckets(ctx: StateContext<InkBuckets>, action: PopulateBuckets) {
    const state: any = ctx.getState();
    ctx.setState([...state, ...action.buckets]);
  }
  @Action(RenameBucket)
  renameBucket(ctx: StateContext<InkBuckets>, action: RenameBucket) {
    const state: any = ctx.getState();
    state.filter(b => b._id === action.id).map(b => (b.name = action.name));
    ctx.setState([...state]);
  }
  @Action(ClearBuckets)
  clearBuckets(ctx: StateContext<InkBuckets>, action: ClearBuckets) {
    ctx.setState([]);
  }
  @Action(DeleteBucket)
  deleteBucket(ctx: StateContext<InkBuckets>, action: DeleteBucket) {
    const state: any = ctx.getState();
    const newState = state.filter(b => b._id !== action.bucketId);
    ctx.setState(newState);
  }
}
