import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { InkColor } from '../../ink.model';
import { UpdateInkColor } from '../../store/actions/ink.action';

@Component({
  selector: 'inkapp-ink',
  templateUrl: './ink.component.html',
  styles: []
})
export class InkComponent implements OnInit {
  @Input() inkData: InkColor;
  @Input() bucketId: number;
  constructor(private store: Store) {}

  ngOnInit() {}
  openColorPicker() {}
  colorChanged(id, c) {
    console.log('c', c);
    this.store.dispatch(new UpdateInkColor({ bucketId: this.bucketId, value: c.color.hex, meta: c.color, id }));
  }
}
