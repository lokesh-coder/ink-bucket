import { State, Action, StateContext, Selector, NgxsOnInit } from '@ngxs/store';
import { InkBuckets } from '@lib/models';
import {
  CreateBucket,
  UpdateBucket,
  PopulateBuckets,
  RenameBucket,
  DeleteBucket,
  ClearBuckets,
  ClearDrops
} from '@store/actions';
import { InkBucketsService } from '@lib/services';

@State<InkBuckets>({
  name: 'buckets',
  defaults: []
})
export class BucketsState implements NgxsOnInit {
  constructor(private _service: InkBucketsService) {}

  async ngxsOnInit(ctx: StateContext<InkBuckets>) {
    const buckets = await this._service.getAll();
    ctx.setState(buckets);
  }

  @Action(CreateBucket)
  createBucket(ctx: StateContext<InkBuckets>, action: CreateBucket) {
    return this._service.create(action.bucketData).then(_ => {
      const state = ctx.getState();
      ctx.setState([...state, action.bucketData]);
    });
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
  populateBuckets(ctx: StateContext<InkBuckets>) {
    return this._service.getAll().then(buckets => {
      ctx.setState(buckets);
    });
  }

  @Action(RenameBucket)
  renameBucket(ctx: StateContext<InkBuckets>, action: RenameBucket) {
    const state: any = ctx.getState();
    return this._service.changeName(action.id, action.name).then(bucket => {
      state.filter(b => b._id === action.id).map(b => (b.name = action.name));
      ctx.setState([...state]);
    });
  }
  @Action(ClearBuckets)
  clearBuckets(ctx: StateContext<InkBuckets>, action: ClearBuckets) {
    ctx.setState([]);
  }
  @Action(DeleteBucket)
  deleteBucket(ctx: StateContext<InkBuckets>, action: DeleteBucket) {
    return this._service.delete(action.bucketId).then(bucket => {
      const state: any = ctx.getState();
      const newState = state.filter(b => b._id !== action.bucketId);
      ctx.setState(newState);
      ctx.dispatch(new ClearDrops());
    });
  }
}
