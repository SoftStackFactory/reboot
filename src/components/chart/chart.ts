import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { ChartProvider } from '..//../providers/chart/chart';
import { Chart } from 'chart.js';
import 'chartjs-plugin-labels';

/**
 * Generated class for the ChartComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chart',
  templateUrl: 'chart.html'
})
export class ChartComponent implements OnInit {

  @ViewChild('canvas') canvas;

  /* These @Input variables are essential to being able to customize the charts based on what page is displaying it.
     When you include a <chart> tag onto any page, you can now include these variables as attributes. For example:
     <chart [pageData] = "chartProvider.assessmentChartData" [belongsTo] = "transitionPage"></chart>
  */
  @Input() pageData: any; //All chart data lives on the chart provider file and is passed in with this variable.
  @Input() belongsTo: any; // Mostly just used to differentiate if the component is on the history page or not.

  chart: any;
  
  constructor(public chartProvider: ChartProvider) { }

  /*The chartData variable allows changes to the base chart data. */
  chartData = { labels: ["Career", "Finance", "Personal \n Growth", "Health", "Family", "Relationships", "Social life", "Attitude"],
  datasets: [
    {
      backgroundColor: ["rgba(0,0,255, .6)", "rgba(255,0,0, .6)", "rgba(128,0,128, .6)", "rgba(0,128,0, .6)", "rgba(255,165,0, .6)", "rgba(0,128,128, .6)", "rgba(255,0,255, .6)", "rgba(0,255,0, .6)"],
      borderColor: "black",
      data: [8,10,5,10,10,10,10,10], // This data changes depending on what page owns the component. 
      
    }
  ]
  }
  chartOptions = {
    layout: {
      padding: {
        top: this.belongsTo === 'historyPage' ? 5 : 55,
        bottom: this.belongsTo === 'historyPage' ? 5 : 55
      }
    },
    legend: {
      display: false
    },
    'onClick' : function(evt, item) {
      let clickedOn = this.chart.getElementAtEvent(evt)
      console.log('2', clickedOn, clickedOn[0]._index)
    },
    plugins: {
        labels: {
        render: 'label',
        fontSize: 18,
        fontStyle: 'bold',
        fontColor: ["rgba(0,0,255, .6)", "rgba(255,0,0, .6)", "rgba(128,0,128, .6)", "rgba(0,128,0, .6)", "rgba(255,165,0, .6)", "rgba(0,128,128, .6)", "rgba(255,0,255, .6)", "rgba(0,255,0, .6)"],
        arc: true,
        position: "outside",
        overlap: true,
      }
    },
  }

  ngOnInit() {
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'polarArea',
      data: this.chartData,
      options: this.chartOptions,
      
    });

    //This code down below is to fix a bug where I could not modify the scale in the options
    //key in the above code (It threw a typescript error even though it worked)
    this.chart.config.options.scale.ticks.min = 0;
    this.chart.config.options.scale.ticks.max = 10;
    this.chart.update();

  }

}
