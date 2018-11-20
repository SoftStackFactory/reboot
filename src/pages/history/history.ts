import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChartProvider } from '../../providers/chart/chart';
import { Chart } from 'chart.js';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

    @ViewChild('lineChart') lineChart;

  historyPage: any = 'historyPage';
  areas = ["Career", "Finance", "Personal \n Growth", "Health", "Family", "Relationships", "Social life", "Attitude"]
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public chartProvider: ChartProvider) {
  }
  history = [
    {
      date: "11/19/2018",
      value: [0,10,10,10,10,10,10,10]
    },
    {
      date: "11/18/2018",
      value: [8,8,8,8,8,8,8,8]
    }
  ]

  lineChartData = {
    labels: ["11/19/2018", "11/18/2018","11/19/2018","11/19/2018","11/19/2018","11/19/2018","11/19/2018","11/19/2018"],
    datasets:[{
      label: "career",
      data: [0,10,1,9,2,8,3,7],
      backgroundColor: "rgba(255,153,0,0.4)"
    }, {
      label: "finance",
      data: [8,8,7,5,3,4,5,6],
      backgroundColor: "rgba(153,255,0,0.4)"
    }]
  }
  lineChartOptions = {
    elements: {
      line:{
        fill: false
      }
    },
      scales: {
      xAxes:[{
        ticks: {
          min: 0,
          max: 10,
          beginAtZero: true,
          maxTicksLimit: 10,
          stepSize: 1
        }
      }]
    }
  }

  ngOnInit() {
    let ctx = this.lineChart.nativeElement;
    const myLineChart = new Chart(ctx, {
      type:'line',
      data: this.lineChartData,
      options: this.lineChartOptions
    })
    
    myLineChart.update()
  }


}
