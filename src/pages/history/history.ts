import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChartProvider } from '../../providers/chart/chart';
import { Chart } from 'chart.js';


@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

    @ViewChild('lineChart') lineChart;

  historyPage: any = 'historyPage';
  labels  = ["Career", "Finances", "Personal \n Growth", "Health", "Family", "Relationships", "Social life", "Attitude"];
  lineColors = ["rgba(0,0,255, .3)", "rgba(255,0,0, .3)", "rgba(128,0,128, .3)", "rgba(0,128,0, .3)", "rgba(255,165,0, .3)", "rgba(0,128,128, .3)", "rgba(255,0,255, .3)", "rgba(0,255,0, .3)"];
  dataArrays = []
  history:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public chartProvider: ChartProvider) {
    this.chartProvider.getChartHistory().subscribe(res=>{
      this.history = res;
      this.chartData(res)
    })
}
chartData(res){
  let dates = res.map(day => day.date).sort()
  let values = (index) => {
    let value = res.map(val => val.value[index])
    return value
  }
  this.generateChart(dates, values)
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
   generateChart = (dates, values) => {
    let ctx = this.lineChart.nativeElement;
    const myLineChart = new Chart(ctx, {
      type:'line',
      data:  this.lineChartData,
      options: this.lineChartOptions
    })
    this.lineChartData.labels.push(...dates)
    for(let i = 0; i < 8; i++){
      let item = {
      label: this.labels[i],
      data: values(i),
      borderColor: this.lineColors[i]
      }
      this.lineChartData.datasets.push(item)
    }
    this.lineChartData.datasets.forEach(val => this.dataArrays.push(val.data))
    myLineChart.update()
  }


}
