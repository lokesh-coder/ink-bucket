import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, ElementRef, Injectable } from '@angular/core';
import { ColorPickerComponent } from '@lib/modules/color/components/color-picker/color-picker.component';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InkColorPickerService {
  colorPickerRef: ComponentRef<ColorPickerComponent>;
  colorPanelPortal: ComponentPortal<ColorPickerComponent>;
  overlayRef: OverlayRef;
  config: OverlayConfig;
  constructor(private overlay: Overlay) {
    this.config = new OverlayConfig();
  }
  configure(el: ElementRef<any>) {
    this.config.hasBackdrop = true;
    this.config.backdropClass = 'cdk-overlay-transparent-backdrop';
    this.config.scrollStrategy = this.overlay.scrollStrategies.reposition();
    this.config.positionStrategy = this.overlay
      .position()
      .connectedTo(el, { originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' });
    this.overlayRef = this.overlay.create(this.config);
    this.colorPanelPortal = new ComponentPortal(ColorPickerComponent);
  }
  getRef() {
    this.colorPickerRef = this.overlayRef.attach(this.colorPanelPortal);
    return this.colorPickerRef;
  }
  watch() {
    return (this.colorPanelPortal.component as any).onChange;
  }

  backdropClick() {
    return this.overlayRef.backdropClick().pipe(
      tap(_ => {
        this.destroy();
      })
    );
  }

  destroy() {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
      this.colorPickerRef.destroy();
      return;
    }
  }

  remove() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }
}
