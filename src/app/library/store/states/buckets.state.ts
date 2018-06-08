import { State, Action, StateContext, Selector, NgxsOnInit } from '@ngxs/store';
import { InkBuckets } from '@lib/models';
import {
  FetchAllBuckets,
  PopulateAllBuckets,
  CreateBucket,
  AddBucket,
  DeleteBucket,
  RemoveBucket,
  DeleteAllBuckets,
  RemoveAllBuckets,
  DeleteBucketsUnderBoard,
  RemoveBucketsUnderBoard,
  UpdateBucket,
  PatchBucket
} from '@store/actions';
import { InkBucketsService, InkUtilsService } from '@lib/services';

@State<InkBuckets>({
  name: 'buckets',
  defaults: []
})
export class BucketsState implements NgxsOnInit {
  constructor(private _service: InkBucketsService, private _utilityService: InkUtilsService) {}

  async ngxsOnInit(ctx: StateContext<InkBuckets>) {
    const buckets = await this._service.getAll();
    ctx.setState(buckets);
  }

  @Action(FetchAllBuckets)
  fetchAllBuckets(ctx: StateContext<InkBuckets>, action: FetchAllBuckets) {
    return this._service.getAll().then(buckets => {
      ctx.dispatch(new PopulateAllBuckets(buckets));
    });
  }

  @Action(PopulateAllBuckets)
  populateAllBuckets(ctx: StateContext<InkBuckets>, action: PopulateAllBuckets) {
    ctx.setState(action.buckets);
  }

  @Action(CreateBucket)
  createBucket(ctx: StateContext<InkBuckets>, action: CreateBucket) {
    action.bucketData.name += this._utilityService.getRandomNumber();
    return this._service.create(action.bucketData).then(bucket => {
      ctx.dispatch(new AddBucket(bucket));
    });
  }

  @Action(AddBucket)
  addBucket(ctx: StateContext<InkBuckets>, action: AddBucket) {
    const state = ctx.getState();
    ctx.setState([...state, action.bucketData]);
  }

  @Action(DeleteBucket)
  deleteBucket(ctx: StateContext<InkBuckets>, action: DeleteBucket) {
    return this._service.delete(action.bucketId).then(bucket => {
      ctx.dispatch(new RemoveBucket(action.bucketId));
    });
  }

  @Action(RemoveBucket)
  removeBucket(ctx: StateContext<InkBuckets>, action: RemoveBucket) {
    const state: any = ctx.getState();
    const newState = state.filter(b => b._id !== action.bucketId);
    ctx.setState(newState);
  }

  @Action(DeleteAllBuckets)
  deleteAllBuckets(ctx: StateContext<InkBuckets>, action: DeleteAllBuckets) {
    return this._service.deleteAll().then(_ => {
      ctx.dispatch(new RemoveAllBuckets());
    });
  }

  @Action(RemoveAllBuckets)
  removeAllBuckets(ctx: StateContext<InkBuckets>, action: RemoveAllBuckets) {
    ctx.setState([]);
  }

  @Action(UpdateBucket)
  updateBucket(ctx: StateContext<InkBuckets>, action: UpdateBucket) {
    this._service.update(action.bucketData).then(bucket => {
      ctx.dispatch(new PatchBucket(bucket));
    });
  }

  @Action(PatchBucket)
  patchBucket(ctx: StateContext<InkBuckets>, action: PatchBucket) {
    let state: any = ctx.getState();
    state = state.map((a: any) => {
      if (a.id === action.bucketData._id) {
        a.name = action.bucketData.name;
      }
      return a;
    });
    ctx.setState([...state]);
  }

  @Action(DeleteBucketsUnderBoard)
  deleteBucketsUnderBoard(ctx: StateContext<InkBuckets>, action: DeleteBucketsUnderBoard) {}

  @Action(RemoveBucketsUnderBoard)
  removeBucketsUnderBoard(ctx: StateContext<InkBuckets>, action: RemoveBucketsUnderBoard) {}
}
