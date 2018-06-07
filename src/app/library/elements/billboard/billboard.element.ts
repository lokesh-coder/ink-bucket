import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'inkapp-billboard-el',
  templateUrl: 'billboard.element.html'
})
export class BillboardElement implements OnInit {
  @Input() heading: string;
  @Input() subHeading: string;
  constructor() {}

  ngOnInit() {}
}
