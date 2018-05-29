import { State, Action, StateContext } from '@ngxs/store';
import { InkAppSettings } from '../../models';
import { UpdateSettings, LoadSettings } from '../actions/settings.action';

@State<Partial<InkAppSettings>>({
  name: 'settings',
  defaults: []
})
export class SettingsState {
  @Action(UpdateSettings)
  updateSettings(ctx: StateContext<InkAppSettings>, action: UpdateSettings) {
    const state = ctx.getState();
    const newState = state.map(s => {
      if (s[action.key]) {
        s[action.key] = action.value;
      }
      return s;
    });
    ctx.setState([...newState]);
  }
  @Action(LoadSettings)
  load(ctx: StateContext<InkAppSettings>, action: LoadSettings) {
    ctx.setState(action.settings);
  }
}
