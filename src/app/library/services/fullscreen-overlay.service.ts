import { Injectable } from '@angular/core';
import {Toppy, FullscreenPosition, ToppyRef} from 'toppy';

@Injectable({providedIn: 'root'})
export class FullscreenOverlayService {
  private _component;
  private _props = {};
  private _toppyRef: ToppyRef;
  constructor(private _toppy: Toppy) {
  }
  setComponent(component, props= {}) {
    this._component = component;
    this._props = props;
    this._toppyRef = this._init();
    return this;
  }
  open() {
    this._toppyRef.open();
  }
  close() {
    this._toppyRef.close();
  }
  private _init() {
    return this._toppy.overlay(new FullscreenPosition()).host(this._component, this._props).create();
  }

}
