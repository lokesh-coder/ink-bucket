import { Component, OnInit } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'inkapp-export-page',
  templateUrl: 'export.page.html'
})
export class ExportPage implements OnInit {
  jsonData: string;
  constructor(private _copyService: ClipboardService) {}

  ngOnInit() {
  }

  getDatabaseContent() {

  }

  copy() {
    this._copyService.copyFromContent(this.jsonData);
  }
}
