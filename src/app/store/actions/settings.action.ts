import { InkAppView, InkAppSettings } from '../../models';

export class LoadSettings {
  static readonly type = '[Settings] load all settings';
  constructor(public settings: InkAppSettings) {}
}

export class UpdateSettings {
  static readonly type = '[Settings] update';
  constructor(public key: string, public value: string) {}
}
