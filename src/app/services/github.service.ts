import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { filter, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  constructor(private _http: HttpClient) {}
  getToken(code: string, state: string) {
    const body = new HttpParams()
      .set('client_id', environment.githubClientID)
      .set('client_secret', environment.githubClientSecret)
      .set('code', code);
    return this._http.post('/ghtoken', body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*' },
      responseType: 'text'
    });
  }
  createGist(data) {
    return this._http.post(
      'https://api.github.com/gists?access_token=' + localStorage.getItem('inkapp_access_token'),
      JSON.stringify({
        description: 'INKAPP :: SYNC SETTINGS',
        public: false,
        files: {
          'inkapp-database.json': {
            content: JSON.stringify(data)
          }
        }
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    );
  }

  editGist(gistId, data) {
    return this._http.patch(
      'https://api.github.com/gists/' + gistId + '?access_token=' + localStorage.getItem('inkapp_access_token'),
      JSON.stringify({
        files: {
          'inkapp-database.json': {
            content: JSON.stringify(data)
          }
        }
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    );
  }

  getGist() {
    return this._http
      .get(`https://api.github.com/gists?access_token=${localStorage.getItem('inkapp_access_token')}`)
      .pipe(
        map((gists: any) => gists.filter((g: any) => g.description === 'INKAPP :: SYNC SETTINGS')[0] || null),
        switchMap(gist => {
          if (gist) {
            return this._http.get(
              `https://api.github.com/gists/${gist.id}?access_token=${localStorage.getItem('inkapp_access_token')}`
            );
          }
          return of(null);
        })
      );
  }

  deleteGist(gistId) {
    return this._http.delete(
      `https://api.github.com/gists/${gistId}?access_token=${localStorage.getItem('inkapp_access_token')}`
    );
  }
}
