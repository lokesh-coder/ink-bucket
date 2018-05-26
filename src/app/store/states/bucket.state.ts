import { State, Action, StateContext } from '@ngxs/store';
import { InkAppSettings, InkBucket } from '../../models';
import { CreateBucket, UpdateBucket, LoadBuckets } from '../actions/bucket.action';
import { DBService } from '../../services/db.service';
import { LoadInitialData } from '../actions/general.action';
import { UtilService } from '../../services/util.service';

@State<InkBucket>({
  name: 'bucket',
  defaults: []
})
export class BucketState {
  constructor(private db: DBService, private util: UtilService) {}

  @Action(CreateBucket)
  createBucket(ctx: StateContext<InkBucket>, action: CreateBucket) {
    const state = ctx.getState();
    state.push({ ...action.bucketData });
    ctx.setState([...state]);
  }

  @Action(UpdateBucket)
  updateBucket(ctx: StateContext<InkBucket>, action: UpdateBucket) {
    let state: any = ctx.getState();
    state = state.map((a: any) => {
      if (a.id === action.bucketData._id) {
        a.name = action.bucketData.name;
      }
      return a;
    });
    ctx.setState([...state]);
  }

  @Action(LoadBuckets)
  loadBuckets(ctx: StateContext<InkBucket>, action: LoadBuckets) {
    const state: any = ctx.getState();
    ctx.setState([...state, ...action.buckets]);
  }
}
