import { State, Action, StateContext, Selector } from '@ngxs/store';
import { InkAppSettingsItem, InkAppSettings } from '@lib/models';
import { UpdateSettingsItem, PopulateSettings, MergeSettings } from '@store/actions';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { InkSettingsService } from '@lib/services';

@State<Partial<InkAppSettings>>({
  name: 'settings',
  defaults: [{ key: 'view', value: 'thin' }]
})
export class SettingsState {
  @Selector()
  static view(state) {
    return state.filter(s => s.key === 'view')[0].value;
  }

  constructor(private _service: InkSettingsService) {}

  @Action(UpdateSettingsItem)
  updateSettings(ctx: StateContext<InkAppSettings>, action: UpdateSettingsItem) {
    return this._service.update(action.key, action.value).then((doc: any) => {
      const state = ctx.getState();
      const newState = state.map(s => {
        if (s.key === action.key) {
          s.value = action.value;
        }
        return s;
      });
      ctx.setState([...newState]);
    });
  }

  @Action(PopulateSettings)
  populateSettings(ctx: StateContext<InkAppSettings>, action: PopulateSettings) {
    ctx.setState(action.settings);
  }
  @Action(MergeSettings)
  mergeSettings(ctx: StateContext<InkAppSettings>, action: MergeSettings) {
    const state = ctx.getState();
    ctx.setState([...state, ...action.settings]);
  }
}
