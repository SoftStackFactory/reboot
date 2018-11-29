import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { ChartProvider } from '..//../providers/chart/chart';
import { Chart } from 'chart.js';
import 'chartjs-plugin-labelsreboot';

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
      data: this.chartProvider.mostRecentChart // This data changes depending on what page owns the component. 
    }
  ]
  }
  chartOptions = {
    //Set padding of the chart inside of the canvas element.
    layout: {
      padding: {
        top: 55,
        bottom: 55
      }
    },
    //Hides the chart legend.
    legend: {
      display: false
    },
    //Generates an event whenever a section of the chart has been clicked.
    'onClick' : function(evt, item) {
      let clickedOn = this.chart.getElementAtEvent(evt)
      console.log(clickedOn)
    },
    plugins: {
      //labelsReboot is the chartjs-labels plugin that has been revised for this project
      //to allow the labels to be anchored to the outer radius of the chart regardless of chart value
        labelsReboot: {
        render: 'label',
        fontSize: 18,
        fontStyle: 'bold',
        fontColor: ["rgba(0,0,255, .6)", "rgba(255,0,0, .6)", "rgba(128,0,128, .6)", "rgba(0,128,0, .6)", "rgba(255,165,0, .6)", "rgba(0,128,128, .6)", "rgba(255,0,255, .6)", "rgba(0,255,0, .6)"],
        arc: true,
        position: "outside",
        overlap: true,
      }
    },
    //sets the scale of the chart and each line or tick
    scale: {
      ticks: {
        min: 0,
        max: 10
      }
    }
  }

  ngOnInit() {
    //Initializes the chart with the information referenced above
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'polarArea',
      data: this.chartData,
      options: this.chartOptions,
      
    });
  }

}
