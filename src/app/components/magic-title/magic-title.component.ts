import { Component, OnInit, EventEmitter, Output, Input, HostListener } from '@angular/core';

@Component({
  selector: 'inkapp-magic-title',
  templateUrl: 'magic-title.component.html'
})
export class MagicTitleComponent implements OnInit {
  @Output() changed: EventEmitter<string> = new EventEmitter<string>();
  @Input() title: string;
  @Input() index: number;
  @Output() delete: EventEmitter<string> = new EventEmitter();
  editable = false;
  newTitle: string;
  constructor() {}

  ngOnInit() {
    this.newTitle = this.title;
  }

  allowEditing(e) {
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
