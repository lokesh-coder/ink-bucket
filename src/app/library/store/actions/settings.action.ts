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

export class FetchRemoteGist {
  static readonly type = '[Settings] fetch remote gist';
}

export class CreateRemoteGist {
  static readonly type = '[Settings] create remote gist';
  constructor(public gistData: object) {}
}

export class UpdateRemoteGist {
  static readonly type = '[Settings] update remote gist';
  constructor(public gistId: string, public gistData: object) {}
}
