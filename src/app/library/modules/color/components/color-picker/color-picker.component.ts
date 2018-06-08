import { Component, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'inkapp-color-picker',
  templateUrl: 'color-picker.component.html'
})
export class ColorPickerComponent {
  @Input() color: string;
  onChange: Subject<any> = new Subject();
}
