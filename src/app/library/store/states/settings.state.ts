import { State, Action, StateContext, Selector, NgxsOnInit } from '@ngxs/store';
import { InkAppSettingsItem, InkAppSettings } from '@lib/models';
import {
  UpdateSettingsItem,
  PopulateSettings,
  MergeSettings,
  FetchRemoteGist,
  CreateRemoteGist,
  UpdateRemoteGist
} from '@store/actions';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { InkSettingsService, InkGistService } from '@lib/services';
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
  ngxsOnInit(ctx: StateContext<InkAppSettings>) {
    return this._service.getAll().then(settings => {
      ctx.dispatch(new MergeSettings(settings));
    });
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

  // @Action(CreateRemoteGist)
  // createRemoteGist(ctx: StateContext<InkAppSettings>, action: CreateRemoteGist) {
  //   const state = ctx.getState();
  //   ctx.setState([...state, ...action.settings]);
  // }
  // @Action(UpdateRemoteGist)
  // updateRemoteGist(ctx: StateContext<InkAppSettings>, action: UpdateRemoteGist) {
  //   const state = ctx.getState();
  //   ctx.setState([...state, ...action.settings]);
  // }
}
