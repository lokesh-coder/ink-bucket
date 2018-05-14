import { InkAppView } from '../../ink.model';

export class ChangeView {
  static readonly type = '[Settings] change view';
  constructor(public view: InkAppView) {}
}
