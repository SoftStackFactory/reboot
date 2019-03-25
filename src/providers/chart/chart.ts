import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ENV } from '@app/env';
import { StorageProvider } from '../storage/storage'
import { toObservable } from '@angular/forms/src/validators';
import { of as observableOf } from 'rxjs/observable/of'


@Injectable()
export class ChartProvider {
  
  allResults: any;
  chartSections: any;
  requestUrl: string;
  testChart: any = [];
  chartHistory;
  mostRecentChart;
  assessmentChartData;


  constructor(public http: HttpClient, private storage: StorageProvider) { }

  checkSessionCredentials(){
    //Updates the request url to reflect the current credentials in Session storage.
    this.requestUrl = ENV.url + '/appUsers/' + sessionStorage.getItem('userId') + '/charts?access_token=' + sessionStorage.getItem('token');
  }

  addAssessment(assessment) {
    return this.http.post(this.requestUrl, assessment);
  }

  getChartHistory() {
    this.checkSessionCredentials();
    return this.http.get(this.requestUrl).map((res:any[])=>{
      //Initialized an array to store the values.
      let allData:any = []
      res.map(x=>{
        //Maps the response from the API to a format that the history page will accept.
        allData.push({date: moment(x.date).format('MM/DD/YYYY'), value: [x.data.Career, x.data.Finances, x.data["Personal Growth"], x.data.Health, x.data.Family, x.data.Relationships, x.data["Social Life"], x.data.Attitude]})
        return allData
      })
      return allData
    })
  }

  mostRecentData() {
    this.checkSessionCredentials();
    //calls the API to get the assesments from the db
    return this.http.get(this.requestUrl).map((res:any[])=>{
      //Returns all data, recent gets the last or most recent item from the DB
      try {
      let recent = res[res.length-1].data
      //destructures the response object and places it into an array so that the chart can consume it.
      let mostRecentChart = [recent.Career, recent.Finances, recent["Personal Growth"], recent.Health, recent.Family, recent.Relationships, recent["Social Life"], recent.Attitude]
      return mostRecentChart
      } catch(e) {
        return [];
      }
    })
  }

  
}
