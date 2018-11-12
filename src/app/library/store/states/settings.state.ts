import { InkAppSettings } from '@lib/models';
import { InkSettingsService } from '@lib/services';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { DEFAULT_SETTINGS } from '@root/ink.config';
import {
  AddSettingsItem,
  CreateSettingsItem,
  MergeSettings,
  PopulateDefaultSettings,
  PopulateSettings,
  UpdateSettingsItem } from '@store/actions';
import { map } from 'rxjs/operators';

@State<Partial<InkAppSettings>>({
  name: 'settings',
  defaults: [{ key: 'view', value: 'thin' }]
})
export class SettingsState implements NgxsOnInit {
  @Selector()
  static view(state) {
    return state.filter(s => s.key === 'view')[0].value;
  }

  constructor(private _service: InkSettingsService) {}

  async ngxsOnInit(ctx: StateContext<InkAppSettings>) {
    const defaultSettings = this._service.getAll();
    if (defaultSettings.length === 0) {
      return ctx.dispatch(new PopulateDefaultSettings(DEFAULT_SETTINGS));
    }
    ctx.dispatch(new PopulateSettings(defaultSettings));
  }

  @Action(UpdateSettingsItem)
  updateSettings(ctx: StateContext<InkAppSettings>, action: UpdateSettingsItem) {
    return this._service.update(action.key, action.value).pipe(map((doc: any) => {
      const state = ctx.getState();
      const newState = state.map(s => {
        if (s.key === action.key) {
          s.value = action.value;
        }
        return s;
      });
      ctx.setState([...newState]);
    }));
  }

  @Action(CreateSettingsItem)
  createSettingsItem(ctx: StateContext<InkAppSettings>, action: CreateSettingsItem) {
    this._service.add(action.key, action.value).pipe(map(settingsItem => {
      ctx.dispatch(new AddSettingsItem({ key: action.key, value: action.value }));
    }));
  }

  @Action(AddSettingsItem)
  addSettingsItem(ctx: StateContext<InkAppSettings>, action: AddSettingsItem) {
    const state = ctx.getState();
    ctx.setState([...state, action.settingsItem]);
  }

  @Action(PopulateDefaultSettings)
  populateDefaultSettings(ctx: StateContext<InkAppSettings>, action: PopulateDefaultSettings) {
    this._service.addAll(action.settings).pipe(map(settings => {
      ctx.dispatch(new PopulateSettings(settings));
    }));
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
