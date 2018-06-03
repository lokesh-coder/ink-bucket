import { Component, OnInit, Input, OnDestroy, ComponentRef, ElementRef } from '@angular/core';
import { Store } from '@ngxs/store';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { map, debounceTime } from 'rxjs/operators';
import { InkDropMeta } from '@lib/models';
import { InkDropsService } from '@lib/services';
import { UpdateDrop } from '@store/actions';
import { InkColorPickerService } from '@services/color-picker.service';
import { ChromeComponent } from 'ngx-color/chrome';

@Component({
  selector: 'inkapp-drop',
  templateUrl: './drop.component.html',
  providers: [InkColorPickerService]
})
export class DropComponent implements OnInit, OnDestroy {
  @Input() data: InkDropMeta;
  @Input() bucketId: string;
  colorPickerRef: ComponentRef<ChromeComponent>;
  drop: InkDropMeta = null;
  constructor(private _store: Store, private _colorPickerService: InkColorPickerService, private _elRef: ElementRef) {}

  ngOnInit() {
    console.log('drop');
    this._colorPickerService.configure(this._elRef);
    this.drop = this.data;
  }
  openColorPicker() {
    console.log('hsl');
    this.colorPickerRef = this._colorPickerService.getRef();
    if (this.data.meta.hsl) {
      this.colorPickerRef.instance.color = this.data.meta.hsl;
    }
    this.colorPickerRef.instance.onChange.pipe(map(c => c.color)).subscribe(color => {
      this.drop = {
        name: color.hex,
        displayValue: color.hex,
        meta: color,
        bucketId: this.bucketId,
        _id: this.data._id
      };
    });
    this._colorPickerService.backdropClick().subscribe(b => {
      if (this.drop.name !== this.data.name) {
        this._store.dispatch(new UpdateDrop(this.data._id, this.drop));
      }
    });
  }

  ngOnDestroy() {
    this._colorPickerService.remove();
  }
}
