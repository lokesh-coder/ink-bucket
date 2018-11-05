import { InkAppSettings, InkSettingsMeta } from '@lib/models';

export class FetchSettings {
  static readonly type = '[Settings] fetch settings';
  constructor(public settings: InkAppSettings) {}
}

export class PopulateDefaultSettings {
  static readonly type = '[Settings] populate default settings';
  constructor(public settings: InkAppSettings) {}
}

export class PopulateSettings {
  static readonly type = '[Settings] load all settings';
  constructor(public settings: InkAppSettings) {}
}

export class MergeSettings {
  static readonly type = '[Settings] merge settings';
  constructor(public settings: InkAppSettings) {}
}

export class CreateSettingsItem {
  static readonly type = '[Settings] create settings';
  constructor(public key: string, public value: any) {}
}

export class AddSettingsItem {
  static readonly type = '[Settings] add settings';
  constructor(public settingsItem: InkSettingsMeta) {}
}

export class UpdateSettingsItem {
  static readonly type = '[Settings] update';
  constructor(public key: string, public value: any) {}
}

export class DeleteSettingsItem {
  static readonly type = '[Settings] delete';
  constructor(public key: string) {}
}
