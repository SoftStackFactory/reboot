import { ChartProvider } from './../../providers/chart/chart';
import { Component, ViewChild, Input, OnInit } from '@angular/core';
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
export class ChartComponent {

  @ViewChild('canvas') canvas;

  /* These @Input variables are essential to being able to customize the charts based on what page is displaying it.
     When you include a <chart> tag onto any page, you can now include these variables as attributes. For example:
     <chart [pageData] = "chartProvider.assessmentChartData" [belongsTo] = "transitionPage"></chart>
  */
  @Input() pageData: any; //All chart data lives on the chart provider file and is passed in with this variable.
  @Input() belongsTo: any; // Mostly just used to differentiate if the component is on the history page or not.
  chart: any;
  chartValues: any;
  constructor(public chartProvider: ChartProvider) { 
    //this subscribes to the provider and gets the data from the DB
    this.chartProvider.getChartHistory().map((res:Response)=>{
      //this gets the most recent self assessment
       let recent =  res[0].data;
        //this creates an array for the data from the DB
       this.chartValues = [recent.Attitude, recent.Career, recent.Family, recent.Finance, recent.Health,recent['Personal Growth'], recent.Relationships, recent['Social Life'] ]
       //this calls the function to build the chart once the data is ready.
       this.buildChart(this.chartValues)
    })
    .subscribe(data=>{data})
  }

  //this builds the chart.
  buildChart(data){
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'polarArea',
      data: { labels: ["Career", "Finance", "Personal \n Growth", "Health", "Family", "Relationships", "Social life", "Attitude"],
      datasets: [
        {
          backgroundColor: ["rgba(0,0,255, .6)", "rgba(255,0,0, .6)", "rgba(128,0,128, .6)", "rgba(0,128,0, .6)", "rgba(255,165,0, .6)", "rgba(0,128,128, .6)", "rgba(255,0,255, .6)", "rgba(0,255,0, .6)"],
          borderColor: "black",
          data:  data // This data changes depending on what page owns the component. 
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
    //This sets the ticks on the chart to always start at 0 and end at 10.
    this.chart.config.options.scale.ticks.min = 0;
    this.chart.config.options.scale.ticks.max = 10;
    this.chart.update();
  }
    
}
