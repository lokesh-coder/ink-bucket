import { Injectable } from '@angular/core';
import { INKAPP_VERSION } from 'environments/version';
import now from 'lodash-es/now';
import random from 'lodash-es/random';
import uniqueId from 'lodash-es/uniqueId';

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

  getRandomNumber(lower = 1, upper = 1000, floating = false) {
    return random(lower, upper, floating);
  }
  getuniqueId(prefix = '') {
    return uniqueId(prefix);
  }
}
