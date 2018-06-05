import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { GIST_NAME } from '@root/ink.config';
import { InkUtilsService } from '@lib/services/utility.service';
import { InkGist } from '@lib/models';

@Injectable({
  providedIn: 'root'
})
export class InkGistService {
  constructor(private _http: HttpClient, private _utilityService: InkUtilsService) {}
  create(data) {
    return this._http
      .post('https://api.github.com/gists', {
        description: GIST_NAME,
        public: false,
        files: {
          'inkapp-database.json': {
            content: JSON.stringify(data, null, ' ')
          },
          'last-sync.json': {
            content: JSON.stringify(this._utilityService.getCurrentStatus(), null, ' ')
          }
        }
      })
      .pipe(map(gist => this._getGistBasicData(gist)));
  }

  edit(gistId, data) {
    return this._http
      .patch(`https://api.github.com/gists/${gistId}`, {
        files: {
          'inkapp-database.json': {
            content: JSON.stringify(data, null, ' ')
          },
          'last-sync.json': {
            content: JSON.stringify(this._utilityService.getCurrentStatus(), null, ' ')
          }
        }
      })
      .pipe(
        map(gist => this._getGistBasicData(gist)),
        catchError(err => {
          if (err.status === 404) {
            return this.create(data);
          }
          return of(new Error('Something went wrong!'));
        })
      );
  }

  get() {
    return this._http.get(`https://api.github.com/gists`).pipe(
      map((gists: any) => gists.filter((g: any) => g.description === GIST_NAME)[0] || null),
      switchMap(gist => {
        if (gist) {
          return this._http.get(`https://api.github.com/gists/${gist.id}`);
        }
        return of(null);
      }),
      map(gist => {
        return gist.files['inkapp-database.json'].content;
      }),
      map(gist => JSON.parse(gist))
    );
  }

  delete(gistId) {
    return this._http.delete(`https://api.github.com/gists/${gistId}`);
  }

  private _getGistBasicData(gist): InkGist {
    return {
      url: gist.url,
      id: gist.id,
      owner_img: gist.owner.avatar_url,
      owner_name: gist.owner.login,
      owner_profile: gist.owner.html_url
    };
  }
}
