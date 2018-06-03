import { State, Action, StateContext } from '@ngxs/store';
import { InkAppSettingsItem, InkAppSettings } from '@lib/models';
import { UpdateSettingsItem, PopulateSettings } from '@store/actions';

@State<Partial<InkAppSettings>>({
  name: 'settings',
  defaults: []
})
export class SettingsState {
  @Action(UpdateSettingsItem)
  updateSettings(ctx: StateContext<InkAppSettings>, action: UpdateSettingsItem) {
    const state = ctx.getState();
    const newState = state.map(s => {
      if (s[action.key]) {
        s[action.key] = action.value;
      }
      return s;
    });
    ctx.setState([...newState]);
  }

  @Action(PopulateSettings)
  load(ctx: StateContext<InkAppSettings>, action: PopulateSettings) {
    ctx.setState(action.settings);
  }
}
