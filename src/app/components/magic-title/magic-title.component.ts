import { Component, OnInit, EventEmitter, Output, Input, HostListener } from '@angular/core';

@Component({
  selector: 'inkapp-magic-title',
  templateUrl: 'magic-title.component.html'
})
export class MagicTitleComponent implements OnInit {
  @Output() changed: EventEmitter<string> = new EventEmitter<string>();
  @Input() title: string;
  editable = false;
  newTitle: string;
  constructor() {}

  ngOnInit() {
    this.newTitle = this.title;
  }

  @HostListener('dblclick', ['$event.target'])
  onDblClick(e) {
    this.editable = true;
  }

  done() {
    this.editable = false;
    this.changed.emit(this.newTitle);
  }
  cancel() {
    this.editable = false;
    this.newTitle = this.title;
  }
}
