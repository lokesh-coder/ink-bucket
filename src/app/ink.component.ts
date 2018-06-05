import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'inkapp-root',
  template: `
  <inkapp-header></inkapp-header>
  <router-outlet></router-outlet>
  `
})
export class InkApp implements OnInit {
  constructor() {}
  ngOnInit() {}
}
