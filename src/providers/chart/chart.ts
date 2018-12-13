import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { ENV } from '@app/env';




@Injectable()
export class ChartProvider {
  
  allResults: any;
  chartSections: any;
  requestUrl: string = ENV.url + '/charts?access_token=' + sessionStorage.getItem('token')
  testChart: any = [];
  constructor(public http: HttpClient) { }

  addAssessment(assessment) {
    let token = window.sessionStorage.getItem("token");
    return this.http.post(this.requestUrl + '/charts?access_token=ff' + token, assessment);
  }

  getChartHistory() {
    return this.http.get(this.requestUrl).map((res:any[])=>{
      let allData:any = []
      res.map(x=>{
        allData.push({date: moment(x.date).format('MM/DD/YYYY'), value: [x.data.Career, x.data.Finance, x.data.PersonalGrowth, x.data.Health, x.data.Family, x.data.Relationships, x.data.SocialLife, x.data.Attitude]})
        return allData
      })
      return allData
    })
  }
  mostRecentData() {
    //calls the API to get the assesments from the db
    return this.http.get(this.requestUrl).map((res:any[])=>{
      //Returns all data, recent gets the last or most recent item from the DB
      let recent = res[res.length-1].data
      //destructures the response object and places it into an array so that the chart can consume it.
      let mostRecentChart = [recent.Career, recent.Finance, recent.PersonalGrowth, recent.Health, recent.Family, recent.Relationships, recent.SocialLife, recent.Attitude]
      return mostRecentChart
    })
  }

  
}

