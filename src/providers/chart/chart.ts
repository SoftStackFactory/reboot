import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ENV } from '@app/env';

@Injectable()
export class ChartProvider {

  allResults: any;
  chartSections: any;
  mostRecentChart: any = [0, 0, 0, 0, 0, 0, 0, 0]; // Data for the chart on the dashboard page
  requestUrl: string = ENV.url
  constructor(public http: HttpClient) { }

  getChartHistory() {
    return this.http.get(this.requestUrl + '/charts?access_token=' + sessionStorage.getItem('token'))
  }

  
}

