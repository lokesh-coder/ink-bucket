import { State, Action, StateContext, Selector, NgxsOnInit } from '@ngxs/store';
import { InkBuckets } from '@lib/models';
import {
  FetchAllBuckets,
  PopulateAllBuckets,
  CreateBucket,
  AddBucket,
  DeleteBucket,
  RemoveBucket,
  DeleteBucketsUnderBoard,
  RemoveBucketsUnderBoard,
  UpdateBucket,
  PatchBucket,
  DeleteDropsUnderBucket,
} from '@store/actions';
import { InkBucketsService, InkUtilsService } from '@lib/services';
import { map } from 'rxjs/operators';

@State<InkBuckets>({
  name: 'buckets',
  defaults: []
})
export class BucketsState implements NgxsOnInit {
  constructor(private _service: InkBucketsService, private _utilityService: InkUtilsService) {}

  ngxsOnInit(ctx: StateContext<InkBuckets>) {
    this._service.getAll().subscribe(buckets => {
      ctx.setState(buckets);
    });
  }

  @Action(FetchAllBuckets)
  fetchAllBuckets(ctx: StateContext<InkBuckets>, action: FetchAllBuckets) {
    return this._service.getAll().pipe(map(buckets => {
      ctx.dispatch(new PopulateAllBuckets(buckets));
    }));
  }

  @Action(PopulateAllBuckets)
  populateAllBuckets(ctx: StateContext<InkBuckets>, action: PopulateAllBuckets) {
    ctx.setState(action.buckets);
  }

  @Action(CreateBucket)
  createBucket(ctx: StateContext<InkBuckets>, action: CreateBucket) {
    action.bucketData.name += this._utilityService.getRandomNumber();
    return this._service.create(action.bucketData as any).pipe(map(bucket => {
      ctx.dispatch(new AddBucket(bucket));
    }));
  }

  @Action(AddBucket)
  addBucket(ctx: StateContext<InkBuckets>, action: AddBucket) {
    const state = ctx.getState();
    ctx.setState([action.bucketData, ...state]);
  }

  @Action(DeleteBucket)
  deleteBucket(ctx: StateContext<InkBuckets>, action: DeleteBucket) {
    return this._service.delete(action.bucketId).pipe(map(_ => {
      ctx.dispatch(new DeleteDropsUnderBucket(action.bucketId));
      ctx.dispatch(new RemoveBucket(action.bucketId));
    }));
  }

  @Action(RemoveBucket)
  removeBucket(ctx: StateContext<InkBuckets>, action: RemoveBucket) {
    const state: any = ctx.getState();
    const newState = state.filter(b => b.id !== action.bucketId);
    ctx.setState(newState);
  }

  @Action(UpdateBucket)
  updateBucket(ctx: StateContext<InkBuckets>, action: UpdateBucket) {
    return this._service.update(action.bucketData).pipe(map(bucket => {
      ctx.dispatch(new PatchBucket(bucket));
    }));
  }

  @Action(PatchBucket)
  patchBucket(ctx: StateContext<InkBuckets>, action: PatchBucket) {
    let state: any = ctx.getState();
    state = state.map((a: any) => {
      if (a.id === action.bucketData.id) {
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
