import { Component, OnInit, Input, OnDestroy, ComponentRef, ElementRef } from '@angular/core';
import { Store } from '@ngxs/store';
import { InkColorMeta, InkDocMethods } from '../../models';
import { UpdateInkColor } from '../../store/actions/ink.action';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChromeComponent } from 'ngx-color/chrome';
import { map, debounceTime } from 'rxjs/operators';
import { InkColorService } from '../../services/ink.service';

@Component({
  selector: 'inkapp-ink',
  templateUrl: './ink.component.html',
  styles: []
})
export class InkComponent implements OnInit, OnDestroy {
  @Input() inkData: InkColorMeta;
  @Input() bucketId: string;
  overlayRef: OverlayRef;
  colorPanelPortal: ComponentPortal<ChromeComponent>;
  colorPickerRef: ComponentRef<ChromeComponent>;
  inkColor: InkColorMeta = null;
  constructor(
    private _store: Store,
    private overlay: Overlay,
    private elRef: ElementRef,
    private _inkColorService: InkColorService
  ) {}

  ngOnInit() {
    const config = new OverlayConfig();
    config.hasBackdrop = true;
    config.backdropClass = 'cdk-overlay-transparent-backdrop';
    config.positionStrategy = this.overlay
      .position()
      .connectedTo(this.elRef, { originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' });
    this.inkColor = this.inkData;

    this.overlayRef = this.overlay.create(config);
    this.colorPanelPortal = new ComponentPortal(ChromeComponent);
    // (this.colorPanelPortal.component as any).onChange.subscribe(a => {
    //   console.log('hhh', a);
    // });
  }
  openColorPicker() {
    this.colorPickerRef = this.overlayRef.attach(this.colorPanelPortal);
    if (this.inkData.meta.hsl) {
      this.colorPickerRef.instance.color = this.inkData.meta.hsl;
    }
    this.colorPickerRef.instance.onChange.pipe(map(c => c.color)).subscribe(color => {
      this.inkColor = {
        name: color.hex,
        displayValue: color.hex,
        meta: color,
        bucketId: this.bucketId,
        _id: this.inkData._id
      };
    });
    this.overlayRef.backdropClick().subscribe(b => {
      if (this.inkColor.name !== this.inkData.name) {
        this.updateInkColor(this.inkColor);
      }
      if (this.overlayRef && this.overlayRef.hasAttached()) {
        this.overlayRef.detach();
        this.colorPickerRef.destroy();
        return;
      }
    });
  }
  updateInkColor(data: InkColorMeta) {
    this._inkColorService.updateInkColor(this.inkData._id, data).then(doc => {
      this._store.dispatch(new UpdateInkColor(this.inkData._id, data));
    });
  }
  ngOnDestroy() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }
}
