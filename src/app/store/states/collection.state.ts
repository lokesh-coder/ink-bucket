import { State, Action, StateContext } from '@ngxs/store';
import { InkCollection, InkCollectionMeta } from '../../ink.model';
import { LoadInitialData } from '../actions/general.action';
import { UtilService } from '../../services/util.service';
import { CreateCollection, UpdateCollection } from '../actions/collection.actions';
import { DBService } from '../../services/db.service';

@State<InkCollection>({
  name: 'collection',
  defaults: []
})
export class CollectionState {
  constructor(private db: DBService, private util: UtilService) {}

  @Action(CreateCollection)
  createCollection(ctx: StateContext<InkCollection>, action: CreateCollection) {
    const state = ctx.getState();
    state.push({ ...action.collectionData, id: this.util.ID });
    ctx.setState([...state]);
    this.db.saveDocument('collection', state);
  }

  @Action(UpdateCollection)
  updateCollection(ctx: StateContext<InkCollection>, action: UpdateCollection) {
    let state: any = ctx.getState();
    state = state.map((a: any) => {
      if (a.id === action.collectionData.id) {
        a.name = action.collectionData.name;
      }
      return a;
    });
    ctx.setState([...state]);
    this.db.updateDocument('collection', { id: action.collectionData.id }, action.collectionData);
  }

  @Action(LoadInitialData)
  loadCollectionData(ctx: StateContext<InkCollection>, action: LoadInitialData) {
    if (action.db !== 'collection') {
      return;
    }
    const defaultData = {
      id: this.util.ID,
      created: new Date(),
      name: 'Default'
    };
    const data = action.value.length === 0 ? defaultData : action.value;
    ctx.setState(data);
    this.db.saveDocument('collection', data);
  }
}
