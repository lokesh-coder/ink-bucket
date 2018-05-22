import { InkAppView } from '../../models';

export class ChangeView {
  static readonly type = '[Settings] change view';
  constructor(public view: InkAppView) {}
}
