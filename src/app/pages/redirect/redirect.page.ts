import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'inkapp-redirect-page',
  template: 'Redirecting...'
})
export class RedirectPage implements OnInit {
  params: Params = {};
  constructor(private _router: Router, private _route: ActivatedRoute) {
    this.params = this._route.snapshot.queryParams;
  }

  ngOnInit() {
    if (this.params.error) {
      console.error('Error!', this.params.error);
    }
    // todo: handle redirection properly
    this._router.navigateByUrl('/settings');
  }
}
