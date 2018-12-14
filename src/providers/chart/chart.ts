import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { ENV } from '@app/env';
import { StorageProvider } from '../storage/storage'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';




@Injectable()
export class ChartProvider {
  
  allResults: any;
  chartSections: any;
  requestUrl: string = ENV.url + '/charts?access_token=' + sessionStorage.getItem('token')
  testChart: any = [];
  chartHistory;
  mostRecentChart;
  assessmentChartData;


  constructor(public http: HttpClient, private storage: StorageProvider) { }

  addAssessment(assessment) {
    if(ENV.mode === 'Development') {
      let storageObservable = Observable.fromPromise(this.storage.addToItem('assessement', assessment))
      console.log(storageObservable)
      return storageObservable;
    } else {
      let token = window.sessionStorage.getItem("token");
      return this.http.post(this.requestUrl, assessment);
    }
  }

  getChartHistory() {
    return this.http.get(this.requestUrl).map((res:any[])=>{
      //Initialized an array to store the values.
      let allData:any = []
      res.map(x=>{
        //Maps the response from the API to a format that the history page will accept.
        allData.push({date: moment(x.date).format('MM/DD/YYYY'), value: [x.data.Career, x.data.Finance, x.data['Personal Growth'], x.data.Health, x.data.Family, x.data.Relationships, x.data['Social Life'], x.data.Attitude]})
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
      let mostRecentChart = [recent.Career, recent.Finance, recent['Personal Growth'], recent.Health, recent.Family, recent.Relationships, recent['Social Life'], recent.Attitude]
      return mostRecentChart
    })
  }

  
}

