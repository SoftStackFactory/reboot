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
  labels  = ["Career", "Finance", "Personal \n Growth", "Health", "Family", "Relationships", "Social life", "Attitude"];
  lineColors = ["rgba(0,0,255, .3)", "rgba(255,0,0, .3)", "rgba(128,0,128, .3)", "rgba(0,128,0, .3)", "rgba(255,165,0, .3)", "rgba(0,128,128, .3)", "rgba(255,0,255, .3)", "rgba(0,255,0, .3)"];
  dataArrays = []
  constructor(public navCtrl: NavController, public navParams: NavParams, public chartProvider: ChartProvider) {
    
  }
  history = [
    {
      date: "11/19/2018",
      value: [0,10,2,1,4,5,6,9]
    },
    {
      date: "11/18/2018",
      value: [8,2,3,5,4,10,9,7]
    },
    {
      date: "11/17/2018",
      value: [0,10,2,1,4,5,6,9]
    },
    {
      date: "11/16/2018",
      value: [8,2,3,5,4,10,9,7]
    },
    {
      date: "11/15/2018",
      value: [0,10,2,1,4,5,6,9]
    },
    {
      date: "11/14/2018",
      value: [8,2,3,5,4,10,9,7]
    },
    {
      date: "11/13/2018",
      value: [0,10,2,1,4,5,6,9]
    },
    {
      date: "11/12/2018",
      value: [8,2,3,5,4,10,9,7]
    }
  ]
  dates = this.history.map(day => day.date).sort()
  values = (index) => {
    let value = this.history.map(val => val.value[index])
    return value
  }
  
  lineChartData = {
    labels: [],
    datasets:[]
  }
  lineChartOptions = {
    elements: {
      line:{
        fill: false
      }
    },
      scales: {
      xAxes:[{
        stacked: true
        }
      ],
      yAxes: [{
        ticks: {
          min: 0,
          max: 10,
          beginAtZero: true,
          maxTicksLimit: 10,
          stepSize: 1,
        }
      }]
    }
  }
  generateChart = () => {
    let ctx = this.lineChart.nativeElement;
    const myLineChart = new Chart(ctx, {
      type:'line',
      data: this.lineChartData,
      options: this.lineChartOptions
    })
    this.lineChartData.labels.push(...this.dates)
    for(let i = 0; i < 8; i++){
      let item = {
      label: this.labels[i],
      data: this.values(i),
      borderColor: this.lineColors[i]
      }
      this.lineChartData.datasets.push(item)
    }
    this.lineChartData.datasets.forEach(val => this.dataArrays.push(val.data))
    myLineChart.update()
  }

  ngOnInit() {
    this.generateChart()
    
    
    console.log(this.lineChartData)
  }


}
