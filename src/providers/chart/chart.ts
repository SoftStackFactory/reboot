import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ENV } from '@app/env';




@Injectable()
export class ChartProvider {
  
  allResults: any;
  chartSections: any;
  requestUrl: string = ENV.url + '/charts?access_token=' + sessionStorage.getItem('token')
  testChart: any = [];
  constructor(public http: HttpClient) { }

  getChartHistory() {
    return this.http.get(this.requestUrl).subscribe((res:any[])=>{
      
      return res
    })
  }
  mostRecentData() {
    //calls the API to get the assesments from the db
    return this.http.get(this.requestUrl).map((res:any[])=>{
      //Returns all data, recent gets the last or most recent item from the DB
      let recent = res[res.length-1].data
      //destructures the response object and places it into an array so that the chart can consume it.
      let mostRecentChart = [recent.Career, recent.Finance, recent['Personal Growth'], recent.Health, recent.Family, recent.Relationships, recent["Social Life"], recent.Attitude]
      return mostRecentChart
    })
  }

  
}

