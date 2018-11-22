import { Component, OnInit } from '@angular/core';
import { CurrentOverlay } from 'toppy';

@Component({
  selector: 'inkapp-slate',
  templateUrl: './slate.component.html'
})
export class SlateComponent implements OnInit {
  displayValue: any;

  constructor(private _overlay: CurrentOverlay) { }

  ngOnInit() {
    console.log(this.displayValue);
  }
  close() {
    this._overlay.close();
  }

}
