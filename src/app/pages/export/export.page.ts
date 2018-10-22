import { Component, OnInit } from '@angular/core';
import { InkDatabaseService } from '@lib/services';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'inkapp-export-page',
  templateUrl: 'export.page.html'
})
export class ExportPage implements OnInit {
  jsonData: string;
  constructor(private _db: InkDatabaseService, private _copyService: ClipboardService) {}

  ngOnInit() {
    this.getDatabaseContent();
  }

  async getDatabaseContent() {
    const db = await this._db.getDatabase();
    this.jsonData = JSON.stringify(await db.dump(), null, ' ');
  }

  copy() {
    this._copyService.copyFromContent(this.jsonData);
  }
}
