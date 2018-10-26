import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import  {  ENV  }  from  '@app/env';

@Injectable()
export class ChartProvider {

  data: any = [0, 0, 0, 0, 0, 0, 0, 0]
  requestUrl: string = ENV.url

  constructor(public http: HttpClient) {
    console.log('Hello ChartProvider Provider');
  }

  getHistory() {
    return this.http.get(this.requestUrl + '/appUsers/' + sessionStorage.getItem('userId') + '/charts')
  }
}
