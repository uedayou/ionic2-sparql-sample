import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SparqlProvider } from '../../providers/sparql-provider';

/*
  Generated class for the Details page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
  styles: ["h2:first-child{margin-top: 0rem;}"]
})
export class DetailsPage {
  results : string[];

  uri: string;
  title: string;
  endpoint = "https://uedayou.net/isillod/sparql";
  query = "select * where {<##URI##> ?p ?o.}";

  plabels = {
  	"http://schema.org/name" : "Name",
  	"http://schema.org/URL" : "URL",
  	"http://schema.org/image" : "画像",
  	"http://purl.org/dc/terms/identifier" : "ID",
  	"http://dbpedia.org/ontology/originalName" : "Original Name",
  	"http://www.w3.org/1999/02/22-rdf-syntax-ns#type" : "Type",
  	"http://www.w3.org/ns/org#classification" : "クラス",
  	"http://www.w3.org/ns/org#hasSite" : "hasSite",
  	"http://www.w3.org/2002/07/owl#sameAs" : "sameAs",
  	"http://www.w3.org/2003/01/geo/wgs84_pos#lat" : "緯度",
  	"http://www.w3.org/2003/01/geo/wgs84_pos#long" : "経度",
  	"http://www.w3.org/2000/01/rdf-schema#label" : "ラベル",
  	"http://purl.org/dc/terms/title" : "タイトル",
  	"http://purl.org/dc/elements/1.1/title" : "タイトル",
  	"http://purl.org/dc/terms/description" : "概要",
  	"http://purl.org/dc/elements/1.1/description" : "概要"
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private SparqlProvider: SparqlProvider) {
  	this.uri = navParams.get('uri');
  	this.title = navParams.get('title');

    SparqlProvider.get(this.endpoint,this.query.replace("##URI##", this.uri) ).subscribe(result => {
      this.results = result.results.bindings;
    });
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad DetailsPage');
  }

  ValidURL(str:string) : boolean {
	var pattern = new RegExp(/((http|https)\:\/\/)?[a-zA-Z0-9\.\/\?\:@\-_=#]+\.([a-zA-Z0-9\&\.\/\?\:@\-_=#])*/g);
	return pattern.test(str);
  }

  getPropertyLabel(prop:string):string {
  	if (prop in this.plabels) { return this.plabels[prop];}
  	else { return prop; }
  }

  goToExternalPage(url:string) {
  	window.open(url, '_system', 'location=yes');
  }
}
