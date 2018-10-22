import { Component, ComponentRef, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { InkDropMeta } from '@lib/models';
import { ColorPickerComponent } from '@lib/modules/color/components/color-picker/color-picker.component';
import { Store } from '@ngxs/store';
import { DEFAULT_COLOR } from '@root/ink.config';
import { InkColorPickerService } from '@services/color-picker.service';
import { UpdateDrop } from '@store/actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'inkapp-drop',
  templateUrl: './drop.component.html',
  providers: [InkColorPickerService]
})
export class DropComponent implements OnInit, OnDestroy {
  @Input() data: InkDropMeta;
  @Input() bucketId: string;
  colorPickerRef: ComponentRef<ColorPickerComponent>;
  drop: InkDropMeta = null;
  constructor(private _store: Store, private _colorPickerService: InkColorPickerService, private _elRef: ElementRef) {}

  ngOnInit() {
    this._colorPickerService.configure(this._elRef);
    this.drop = this.data;
  }
  openColorPicker() {
    this.colorPickerRef = this._colorPickerService.getRef();
    this.colorPickerRef.instance.color = this.data.meta.hsl ? this.data.meta.hsl : DEFAULT_COLOR;
    this.colorPickerRef.instance.onChange.pipe(map(c => c.color)).subscribe(color => {
      this.drop = {
        name: color.hex,
        displayValue: color.hex,
        meta: color,
        bucketId: this.bucketId,
        id: this.data.id,
        createdBy: null
      };
    });
    this._colorPickerService.backdropClick().subscribe(b => {
      if (this.drop.name !== this.data.name) {
        this._store.dispatch(new UpdateDrop(this.drop));
      }
    });
  }

  ngOnDestroy() {
    this._colorPickerService.remove();
  }
}
