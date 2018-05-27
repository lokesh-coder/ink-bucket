import { Component, OnInit } from '@angular/core';
import { LocalDatabase } from '../../services/localdb.service';

@Component({
  selector: 'inkapp-settings-page',
  templateUrl: './settings.component.html',
  styles: []
})
export class SettingsPage implements OnInit {
  constructor(private _localDatabase: LocalDatabase) {}

  ngOnInit() {}
  deleteDatabase() {
    this._localDatabase.deleteDatabase();
  }
}
