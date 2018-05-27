import { Component, OnInit, EventEmitter } from '@angular/core';
import { Store } from '@ngxs/store';
import { InkColorMeta } from '../../../models';
import { UpdateInkColor } from '../../../store/actions/ink.action';
import { Subject } from 'rxjs';

@Component({
  selector: 'inkapp-chrome-color-picker',
  templateUrl: 'chrome-color-picker.template.html'
})
export class ChromeColorPickerComponent implements OnInit {
  inkData: InkColorMeta;
  bucketId: InkColorMeta;
  private colorChanged: Subject<any> = new Subject();
  constructor(private store: Store) {}

  ngOnInit() {}
  onColorChange(color) {
    this.colorChanged.next(color);
    return this.colorChanged.asObservable();
  }
}
