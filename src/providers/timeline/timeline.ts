import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ENV } from '@app/env';


/*
  Generated class for the TimelineProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TimelineProvider {

  requestUrl: string = "https://joey-new-heroku.herokuapp.com/api";


  constructor(public http: HttpClient) {
    console.log('Hello TimelineProvider Provider');
  }

  saveTimeline(timeCompList, hasEntry: boolean = false){
    const link = this.requestUrl + '/appUsers/' + window.sessionStorage.getItem('userId') + '/timelines';
    if (hasEntry) {
      return this.http.put(link, timeCompList); 
    } else {
      return this.http.post(link, timeCompList);
    }
  }

  getTimeline(){
    console.log("hasTimeline");
    return this.http.get(this.requestUrl + '/appUsers/' + window.sessionStorage.getItem('userId') + '/timelines');

  } 
 


}
