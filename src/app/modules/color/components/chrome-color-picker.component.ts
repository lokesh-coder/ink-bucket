import { Component, OnInit, EventEmitter } from '@angular/core';
import { Store } from '@ngxs/store';
import { Ink, InkColor } from '../../../ink.model';
import { AddNewInk, UpdateInkColor } from '../../../store/actions/ink.action';
import { Subject } from 'rxjs';

@Component({
  selector: 'inkapp-chrome-color-picker',
  templateUrl: 'chrome-color-picker.template.html'
})
export class ChromeColorPickerComponent implements OnInit {
  inkData: InkColor;
  bucketId: InkColor;
  private colorChanged: Subject<any> = new Subject();
  constructor(private store: Store) {}

  ngOnInit() {}
  onColorChange(color) {
    this.colorChanged.next(color);
    return this.colorChanged.asObservable();
  }
}
