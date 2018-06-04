import { InkAppSettings } from '@lib/models';

export class PopulateSettings {
  static readonly type = '[Settings] load all settings';
  constructor(public settings: InkAppSettings) {}
}

export class MergeSettings {
  static readonly type = '[Settings] merge settings';
  constructor(public settings: InkAppSettings) {}
}

export class UpdateSettingsItem {
  static readonly type = '[Settings] update';
  constructor(public key: string, public value: string) {}
}

export class DeleteSettingsItem {
  static readonly type = '[Settings] delete';
  constructor(public key: string) {}
}
