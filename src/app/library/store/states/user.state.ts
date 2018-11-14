import { User } from '@lib/models';
import { Action, State, StateContext } from '@ngxs/store';
import { ResetUser, SaveUser } from '@store/actions';

@State<User>({
  name: 'user',
  defaults: {
    id: null,
    isAnonymous: true
  }
})
export class UserState {

  @Action(SaveUser)
  saveUser(ctx: StateContext<User>, action: SaveUser) {
    const state = ctx.getState();
    ctx.setState({...state, ...action.userData});
  }
  @Action(ResetUser)
  resetUser(ctx: StateContext<User>) {
    ctx.setState({id: null, isAnonymous: true});
  }
}
