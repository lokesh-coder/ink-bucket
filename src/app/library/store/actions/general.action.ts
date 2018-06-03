export class PopulateInitialData {
  static readonly type = '[General] Load initial data';
  constructor(public db: string, public value: any) {}
}
