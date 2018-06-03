import { State, Action, StateContext, Selector } from '@ngxs/store';
import { InkAppSettingsItem, InkAppSettings } from '@lib/models';
import { UpdateSettingsItem, PopulateSettings } from '@store/actions';
import { SelectMultipleControlValueAccessor } from '@angular/forms';

@State<Partial<InkAppSettings>>({
  name: 'settings',
  defaults: [{ key: 'view', value: 'thin' }]
})
export class SettingsState {
  @Selector()
  static view() {
    return state => state.filter(s => s.key === 'view');
  }

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
