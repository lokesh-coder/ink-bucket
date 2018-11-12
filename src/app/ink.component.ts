import { Component } from '@angular/core';

@Component({
  selector: 'inkapp-root',
  template: `
  <inkapp-header></inkapp-header>
  <router-outlet></router-outlet>
  `
})
export class InkApp {}
