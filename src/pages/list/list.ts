import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SparqlProvider } from '../../providers/sparql-provider';
import { DetailsPage } from '../../pages/details/details';

/*
  Generated class for the List page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  styles: ["h2:first-child{margin-top: 0rem;}"]
})
export class ListPage {

  headers : string[];
  results : string[];
  orgResults : string[];

  endpoint = "https://uedayou.net/isillod/sparql";

  query = `
select distinct ?uri ?title where
{
  ?uri <http://dbpedia.org/ontology/originalName> ?title.
} 
`;
  
  searchQuery = `
select distinct ?uri ?title where
{
  ?uri <http://dbpedia.org/ontology/originalName> ?title.
  filter(regex(?title,'##STRING##'))
}
`;

  offset = 0;
  limit = 30;
  
  curQuery = this.query;

  constructor(public navCtrl: NavController, public navParams: NavParams, private SparqlProvider: SparqlProvider) {
    this.getData(this.curQuery);
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ListPage');
  }

  doInfinite(infiniteScroll:any) {
    this.getData(this.curQuery).then(users => {
      infiniteScroll.complete();
    });
  }

  onCancel(event){
    this.results = this.orgResults;
  }

  search(form) {
    // 若干待たないと、エンターキー押した直前の入力データが取れない
    setTimeout(()=>{this._search(form)}, 300);
  }

  _search(form) {
    let term = form.value.sq;
    this.offset = 0;
    // We will only perform the search if we have 3 or more characters
    //if (term.trim() === '' || term.trim().length < 2) {
    if (term.trim() === '') {
      this.results = this.orgResults;
    } else {
      this.curQuery = this.searchQuery.replace('##STRING##', term);
      this.results = [];
      this.getData(this.curQuery);
    }
  }

  getData(query) {
    return new Promise<any>(resolve => {
      this.SparqlProvider.get(this.endpoint,query+`offset ${this.offset} limit ${this.limit}` ).subscribe(result => {
        if (!this.results) {
          this.headers = result.head.vars;
          this.results = result.results.bindings;
          this.orgResults = result.results.bindings;
        }
        else {
          Array.prototype.push.apply(this.results, result.results.bindings);
        }
        this.offset += this.limit;
        resolve(true);
      });
    });
  }

  goToDetails(uri: string, title: string) {
    this.navCtrl.push(DetailsPage, {uri, title});
  }
}
