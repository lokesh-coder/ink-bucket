import { Component, OnInit } from '@angular/core';
import { LocalDatabase } from '../../services/localdb.service';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'inkapp-export',
  templateUrl: 'export.component.html'
})
export class ExportPage implements OnInit {
  jsonData: string;
  constructor(private _localService: LocalDatabase, private _copyService: ClipboardService) {}

  ngOnInit() {
    this.getDatabaseContent();
  }

  async getDatabaseContent() {
    const db = await this._localService.getDatabase();
    this.jsonData = JSON.stringify(await db.dump(), null, ' ');
  }

  copy() {
    this._copyService.copyFromContent(this.jsonData);
  }
}
