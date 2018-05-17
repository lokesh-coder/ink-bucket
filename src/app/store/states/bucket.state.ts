import { State, Action, StateContext } from '@ngxs/store';
import { InkAppSettings, InkBucket } from '../../ink.model';
import { CreateBucket, UpdateBucket } from '../actions/bucket.action';
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
    state.push({ ...action.bucketData, id: this.util.ID });
    ctx.setState([...state]);
    this.db.saveDocument('bucket', state);
  }

  @Action(UpdateBucket)
  updateBucket(ctx: StateContext<InkBucket>, action: UpdateBucket) {
    let state: any = ctx.getState();
    state = state.map((a: any) => {
      if (a.id === action.bucketData.id) {
        a.name = action.bucketData.name;
      }
      return a;
    });
    ctx.setState([...state]);
    this.db.updateDocument('bucket', { id: action.bucketData.id }, action.bucketData);
  }

  @Action(LoadInitialData)
  loadBucketData(ctx: StateContext<InkBucket>, action: LoadInitialData) {
    if (action.db !== 'bucket') {
      return;
    }
    ctx.setState(action.value);
    this.db.saveDocument('bucket', action.value);
  }
}
