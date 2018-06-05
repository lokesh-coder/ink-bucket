import { Component, OnInit, Input } from '@angular/core';
import { InkGist } from '@lib/models';

@Component({
  selector: 'inkapp-user-card-el',
  templateUrl: './user-card.element.html'
})
export class UserCardElement implements OnInit {
  @Input() data: InkGist;
  constructor() {}
  ngOnInit() {}
}
