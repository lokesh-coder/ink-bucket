import { State, Action, StateContext } from '@ngxs/store';
import { InkCollection } from '../../ink.model';

@State<InkCollection>({
  name: 'collection',
  defaults: [
    {
      id: 1,
      created: new Date(),
      name: 'Default'
    }
  ]
})
export class CollectionState {}
