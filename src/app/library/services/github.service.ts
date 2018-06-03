import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { filter, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InkGithubService {
  constructor(private _http: HttpClient) {}
  requestAuth() {
    window.open(
      'https://github.com/login/oauth/authorize?client_id=' +
        environment.githubClientID +
        '&scope=gist&state=kjahfwxbgdcnkockibjfs',
      '_blank'
    );
  }
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
}
