import { InkAppSettings } from '@lib/models';
import { InkGistService, InkSettingsService } from '@lib/services';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { DEFAULT_SETTINGS } from '@root/ink.config';
import { AddSettingsItem, CreateRemoteGist, CreateSettingsItem, FetchRemoteGist, MergeSettings, PopulateDefaultSettings, PopulateSettings, UpdateRemoteGist, UpdateSettingsItem } from '@store/actions';
import { tap } from 'rxjs/operators';

@State<Partial<InkAppSettings>>({
  name: 'settings',
  defaults: [{ key: 'view', value: 'thin' }]
})
export class SettingsState implements NgxsOnInit {
  @Selector()
  static view(state) {
    return state.filter(s => s.key === 'view')[0].value;
  }

  constructor(private _service: InkSettingsService, private _gistService: InkGistService) {}

  async ngxsOnInit(ctx: StateContext<InkAppSettings>) {
    const defaultSettings = await this._service.getAll();
    if (defaultSettings.length === 0) {
      return ctx.dispatch(new PopulateDefaultSettings(DEFAULT_SETTINGS));
    }
    ctx.dispatch(new PopulateSettings(defaultSettings));
  }

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

  @Action(CreateSettingsItem)
  createSettingsItem(ctx: StateContext<InkAppSettings>, action: CreateSettingsItem) {
    this._service.add(action.key, action.value).then(settingsItem => {
      ctx.dispatch(new AddSettingsItem({ key: action.key, value: action.value }));
    });
  }

  @Action(AddSettingsItem)
  addSettingsItem(ctx: StateContext<InkAppSettings>, action: AddSettingsItem) {
    const state = ctx.getState();
    ctx.setState([...state, action.settingsItem]);
  }

  @Action(PopulateDefaultSettings)
  populateDefaultSettings(ctx: StateContext<InkAppSettings>, action: PopulateDefaultSettings) {
    this._service.addAll(action.settings).then(settings => {
      ctx.dispatch(new PopulateSettings(settings));
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

  @Action(FetchRemoteGist)
  fetchRemoteGist(ctx: StateContext<InkAppSettings>, action: FetchRemoteGist) {
    return this._gistService.get();
  }

  @Action(CreateRemoteGist)
  createRemoteGist(ctx: StateContext<InkAppSettings>, action: CreateRemoteGist) {
    return this._gistService
      .create(action.gistData)
      .pipe(tap(gist => ctx.dispatch(new CreateSettingsItem('gist', gist))));
  }

  @Action(UpdateRemoteGist)
  updateRemoteGist(ctx: StateContext<InkAppSettings>, action: UpdateRemoteGist) {
    return this._gistService
      .edit(action.gistId, action.gistData)
      .pipe(tap(gist => ctx.dispatch(new UpdateSettingsItem('gist', gist))));
  }
}
