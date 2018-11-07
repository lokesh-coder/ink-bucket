import { Component } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'inkapp-export-page',
  templateUrl: 'export.page.html'
})
export class ExportPage {
  jsonData: string;

  constructor(private _copyService: ClipboardService) {}

  copy() {
    this._copyService.copyFromContent(this.jsonData);
  }
}
