import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { InAppBrowser } from '@ionic-native/in-app-browser';


/*
  Generated class for the RssProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RssProvider {

  newsArray: any = {};


  constructor(public http: HttpClient, public browser: InAppBrowser) {
    console.log('Hello RssProvider Provider');
  }

  getRSS() {
    const RSS_URL: any = 'https%3A%2F%2Fwww.va.gov%2Fhealth%2FNewsFeatures%2Fnews.xml';
    const API: any = 'l7cijr37lmx6omnmg74t5wpzpbdrtc7oagvbewja';
    const count: any = 10;
    const API_URL: any = 'https://api.rss2json.com/v1/api.json';

    const params = { params: new HttpParams().set('rss_url', 'https://www.va.gov/health/NewsFeatures/news.xml').set('api_key', 'l7cijr37lmx6omnmg74t5wpzpbdrtc7oagvbewja').set('order_by', 'pubDate').set('order_dir', 'desc').set('count', '20')}

    return this.http.get(API_URL, params);
  }
  openLink(url) {
    const link = this.browser.create(url);
  }

}
