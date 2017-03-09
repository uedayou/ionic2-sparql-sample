import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

export interface SparqlResult {
	head: {
      vars: string[],
      link?: string[]
	},
	results: {
	  bindings: string[]
	}
}

/*
  Generated class for the SparqlProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SparqlProvider {

  constructor(public http: Http) {
    //console.log('Hello SparqlProvider Provider');
  }

  get(endpoint: string, query: string): Observable<SparqlResult> {
    let headers = new Headers({ "Accept": "application/sparql-results+json" });
    let params = new URLSearchParams();
    params.set('query', query);
    params.set('format', 'json');
    let options = new RequestOptions({ headers: headers, search: params });
  	return this.http.get(endpoint, options) .map(res => res.json() as SparqlResult)
  }
}
