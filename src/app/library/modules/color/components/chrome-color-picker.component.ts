import { Component, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'inkapp-chrome-color-picker',
  templateUrl: 'chrome-color-picker.template.html'
})
export class ChromeColorPickerComponent {
  colorChanged: Subject<any> = new Subject();
  onColorChange(color) {
    return this.colorChanged.asObservable();
  }
}
