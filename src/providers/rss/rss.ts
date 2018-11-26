import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


/*
  Generated class for the RssProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RssProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RssProvider Provider');
  }

  getRSS() {
    const RSS_URL: any = 'https%3A%2F%2Fwww.va.gov%2Frss%2Frss_PressRel.asp';
    const API: any = 'l7cijr37lmx6omnmg74t5wpzpbdrtc7oagvbewja';
    const count: any = 10;
    const API_URL: any = 'https://api.rss2json.com/v1/api.json';

    const params = { params: new HttpParams().set('rss_url', 'https://www.va.gov/rss/rss_PressRel.asp').set('api_key', 'l7cijr37lmx6omnmg74t5wpzpbdrtc7oagvbewja').set('order_by', 'pubDate').set('order_dir', 'asc')}

    // const response = this.http.post(API_URL, {'rss_url': RSS_URL, 'api_key':API, 'count':count}).map(res => res.json());
    return this.http.get(API_URL, params);
  }

}
