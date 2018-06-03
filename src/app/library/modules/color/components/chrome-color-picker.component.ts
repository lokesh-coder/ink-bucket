import { Component, OnInit, EventEmitter } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { InkDropMeta } from '@lib/models';

@Component({
  selector: 'inkapp-chrome-color-picker',
  templateUrl: 'chrome-color-picker.template.html'
})
export class ChromeColorPickerComponent implements OnInit {
  inkData: InkDropMeta;
  bucketId: InkDropMeta;
  private colorChanged: Subject<any> = new Subject();
  constructor(private store: Store) {}

  ngOnInit() {}
  onColorChange(color) {
    this.colorChanged.next(color);
    return this.colorChanged.asObservable();
  }
}
