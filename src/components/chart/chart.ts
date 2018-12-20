import { ChartProvider } from './../../providers/chart/chart';
import { Component, ViewChild} from '@angular/core';
import { Chart } from 'chart.js';
// import 'chartjs-plugin-labelsreboot';

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
export class ChartComponent {

  @ViewChild('canvas') canvas;

  chart: any;
  chartValues: any;
  constructor(public chartProvider: ChartProvider) { 
    //this subscribes to the provider which gets the data from the DB
    this.chartProvider.mostRecentData().subscribe(res=>{
      //calls the function that draws the chart on the canvas within the .html file of the component taking the response from the provider as an argument.
      this.buildChart(res)
    })
  }

  //this builds the chart, it takes one parameter, the parameter needs to be an array with a length of 8 numbers in order for the chart to draw correctly
  buildChart(data){
    if (data.length < 1) return
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'polarArea',
      data: { labels: ["Career", "Finances", "Personal \n Growth", "Health", "Family", "Relationships", "Social life", "Attitude"],
      datasets: [
        {
          backgroundColor: ["rgba(0,0,255, .6)", "rgba(255,0,0, .6)", "rgba(128,0,128, .6)", "rgba(0,128,0, .6)", "rgba(255,165,0, .6)", "rgba(0,128,128, .6)", "rgba(255,0,255, .6)", "rgba(0,255,0, .6)"],
          borderColor: "black",
          //data is the argument passed into the function.
          data:  data
        }
      ]
      },
      options: {
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
      }
    });
    //This sets the ticks on the chart to always start at 0 and end at 10, utilizing the global API of the local chart.
    this.chart.config.options.scale.ticks.min = 0;
    this.chart.config.options.scale.ticks.max = 10;
    this.chart.update();
  }
    
}
