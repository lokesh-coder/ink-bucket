import { Injectable } from '@angular/core';
import now from 'lodash-es/now';
import { INKAPP_VERSION } from 'environments/version';

@Injectable({
  providedIn: 'root'
})
export class InkUtilsService {
  getCurrentStatus() {
    return {
      timestamp: now(),
      verison: INKAPP_VERSION
    };
  }
}
