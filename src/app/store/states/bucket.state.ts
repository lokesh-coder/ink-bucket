import { State, Action, StateContext } from '@ngxs/store';
import { InkAppSettings, InkBucket } from '../../ink.model';
import { CreateBucket } from '../actions/bucket.action';

@State<InkBucket>({
  name: 'bucket',
  defaults: []
})
export class BucketState {
  @Action(CreateBucket)
  createBucket(ctx: StateContext<InkBucket>, action: CreateBucket) {
    const state = ctx.getState();
    state.push(action.bucketData);
    ctx.setState([...state]);
  }
}
