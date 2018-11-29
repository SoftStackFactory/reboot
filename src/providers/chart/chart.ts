import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/* Commenting out for demo
import  {  ENV  }  from  '@app/env';
End of comment for demo */

@Injectable()
export class ChartProvider {

  chartHistory: any = [
    { date: "11/26/2018",
      data: [10, 8, 9, 6, 9, 10, 6, 4]
    },
    {
      date: "8/26/2018",
      data: [9, 8, 8, 6, 7, 10, 8, 5] 
    },
    {
      date: "5/26/2018",
      data: [5, 6, 9, 3, 2, 10, 6, 4] 
    }
  ]; // Data for the history page

  mostRecentChart: any = [10, 8, 9, 6, 9, 10, 6, 4]; // Data for the chart on the dashboard page
  assessmentChartData: any = [0, 0, 0, 0, 0, 0, 0, 0]; // Range sliders on transition page are ngmodeled to this array
  
  //Commenting the variable below out for demo
  //requestUrl: string = ENV.url  

  constructor(public http: HttpClient) { }

  /* Commenting out for the demo
  
  getChartHistory() {
    return this.http.get(this.requestUrl + '/appUsers/' + sessionStorage.getItem('userId') + '/charts')
  }
  End of comment for the demo */
}
