import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

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
    return this._http.post('https://github.com/login/oauth/access_token', body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }
  createGist() {
    return this._http.post(
      'https://api.github.com/gists?access_token=' + environment.githubClientSecret,
      JSON.stringify({
        description: 'the description for this gist',
        public: false,
        files: {
          'hello.ts': {
            content: '//String file contents'
          }
        }
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    );
  }
}
