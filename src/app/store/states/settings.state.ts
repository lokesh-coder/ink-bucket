import { State, Action, StateContext } from '@ngxs/store';
import { InkAppSettings } from '../../ink.model';
import { ChangeView } from '../actions/settings.action';

@State<Partial<InkAppSettings>>({
  name: 'settings',
  defaults: {}
})
export class SettingsState {
  @Action(ChangeView)
  changeView(ctx: StateContext<InkAppSettings>, action: ChangeView) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      view: action.view
    });
  }
}
