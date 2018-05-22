import { Component, OnInit, Input, OnDestroy, ComponentRef, ElementRef } from '@angular/core';
import { Store } from '@ngxs/store';
import { InkColor } from '../../models';
import { UpdateInkColor } from '../../store/actions/ink.action';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChromeComponent } from 'ngx-color/chrome';
import { map, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'inkapp-ink',
  templateUrl: './ink.component.html',
  styles: []
})
export class InkComponent implements OnInit, OnDestroy {
  @Input() inkData: InkColor;
  @Input() bucketId: string;
  overlayRef: OverlayRef;
  colorPanelPortal: ComponentPortal<ChromeComponent>;
  colorPickerRef: ComponentRef<ChromeComponent>;
  constructor(private store: Store, private overlay: Overlay, private elRef: ElementRef) {}

  ngOnInit() {
    const config = new OverlayConfig();
    config.hasBackdrop = true;
    config.backdropClass = 'cdk-overlay-transparent-backdrop';
    config.positionStrategy = this.overlay
      .position()
      .connectedTo(this.elRef, { originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' });

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
      this.store.dispatch(
        new UpdateInkColor({ bucketId: this.inkData.bucketId, value: color.hex, meta: color, id: this.inkData.id })
      );
    });
    this.overlayRef.backdropClick().subscribe(b => {
      console.log('backdrop clocked', b);
      if (this.overlayRef && this.overlayRef.hasAttached()) {
        this.overlayRef.detach();
        this.colorPickerRef.destroy();
        return;
      }
    });
  }
  ngOnDestroy() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }
}
