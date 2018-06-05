import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { InkGithubService } from '@lib/services';
import { GITHUB_ACCESS_TOKEN_NAME } from '@root/ink.config';

@Component({
  selector: 'inkapp-redirect-page',
  template: 'Redirecting...'
})
export class RedirectPage implements OnInit {
  params: Params = {};
  constructor(private _router: Router, private _route: ActivatedRoute, private _githubService: InkGithubService) {
    this.params = this._route.snapshot.queryParams;
  }

  ngOnInit() {
    if (this.params.error) {
      console.error('Error!', this.params.error);
    }
    this._githubService.getToken(this.params.code, this.params.state).subscribe((res: any) => {
      const data = res
        .split('&')
        .map(s => s.split('='))
        .map(d => ({ [d[0]]: d[1] }));
      localStorage.setItem(GITHUB_ACCESS_TOKEN_NAME, data[0].access_token);
      this._router.navigateByUrl('/settings');
    });
  }
}
