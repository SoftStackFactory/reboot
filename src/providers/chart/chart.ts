import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ENV } from '@app/env';

@Injectable()
export class ChartProvider {

  chartHistory: any; // Data for the history page
  mostRecentChart: any = [0, 0, 0, 0, 0, 0, 0, 0]; // Data for the chart on the dashboard page
  assessmentChartData: any = [0, 0, 0, 0, 0, 0, 0, 0]; // Range sliders on transition page are ngmodeled to this array
  requestUrl: string = ENV.url
  constructor(public http: HttpClient) { }

  addAssessment(assessment) {
    let token = window.sessionStorage.getItem("token");
    return this.http.post(this.requestUrl + '/charts?access_token=ff' + token, assessment);
  }

  getChartHistory() {
    return this.http.get(this.requestUrl + '/appUsers/' + sessionStorage.getItem('userId') + '/charts?access_token=ff' + sessionStorage.getItem('token'))
  }
}
