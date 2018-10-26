import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { ChartProvider } from '..//../providers/chart/chart';
import { Chart } from 'chart.js';
import 'chartjs-plugin-datalabels';

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
     pageData is how we pass different data arrays into the chart at its creation.
     belongsTo is mostly just used to differentiate if the component is on the history page or not.
     More explanation
  */
  @Input() pageData: any; //All chart data lives on the chart provider file and is passed in with this variable.
  @Input() belongsTo: any;

  chart: any;

  constructor(public chartProvider: ChartProvider) { }

  /** This block of code is for everything contained in ngOnInit right below it
 *
 Everything above the options property in the chart code relates to the chart data. Everything below that property modifies the display in some way.
 
 Everything below the plugins property in options relates to the snazzy labels that surround the chart.

 The layout.padding property gives room for the snazzy labels.

 I have added ternary operators to the options.layout.padding and options.plugins.datalabels.formatter properties.
 This is to make it so if the component belongs to the history page, it displays differently than on the transition 
 and dashboard pages. We don't want to display the labels at all on the history page, so the value of formatter is null
 and the padding is less because we don't need to make room for the datalabels anymore.

 In plugins.datalabels:

            anchor, align, and offset are all used to position the labels. the anchor value sets the anchor point from which you'll relate a label's position
            align defines what direction you'll position your labels relative to the anchor point
            offset defines how far away from the anchor point you will position the labels
            For more explanation: https://chartjs-plugin-datalabels.netlify.com/positioning.html

            Some properties have functions as their values. This makes the values dynamic, changing based on certain conditions.
            You'll notice that the functions take an argument called context. This object contains helpful information about the chart. Console log it if you're curious!

            The "rotation" property is what rotates the labels to match where they are around the graph
            The "BorderRadius property " controls how round the edges of the label containers are.
            The "Font" and "Offset" functions scale the font and positioning according to the chart's width.
            The "Formatter" property is what allows us to display the data names and values.
            */

  ngOnInit() {
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'polarArea',
      data: {
        labels: ["Career", "Finance", "Personal \n Growth", "Health", "Family", "Relationships", "Social life", "Attitude"],
        datasets: [
          {
            backgroundColor: ["rgba(0,0,255, .6)", "rgba(255,0,0, .6)", "rgba(128,0,128, .6)", "rgba(0,128,0, .6)", "rgba(255,165,0, .6)", "rgba(0,128,128, .6)", "rgba(255,0,255, .6)", "rgba(0,255,0, .6)"],
            borderColor: "black",
            data: this.pageData // This data changes depending on what page owns the component. 
          }
        ]
      },
      options: {

        layout: {
          padding: {
            top: this.belongsTo === 'historyPage' ? 5 : 55,
            bottom: this.belongsTo === 'historyPage' ? 5 : 55
          }
        },

        legend: {
          display: false
        },

        plugins: {
          datalabels: {
            textAlign: 'center',
            anchor: 'start',
            align: 'end',
            offset: function (context) {
              let chartWidth = context.chart.width;
              return chartWidth / 4.0 - 60;
            },
            backgroundColor: ["rgba(0,0,255, .2)", "rgba(255,0,0, .2)", "rgba(128,0,128, .2)", "rgba(0,128,0, .2)", "rgba(255,165,0, .2)", "rgba(0,128,128, .2)", "rgba(255,0,255, .2)", "rgba(0,255,0, .2)"],
            borderColor: 'black',
            rotation: function (context) {
              if (context.dataIndex === 0 || context.dataIndex === 1 || context.dataIndex === 6 || context.dataIndex === 7) { return 45 / 2 + (45 * context.dataIndex) }
              else { return 45 / 2 + (45 * context.dataIndex) + 180 }
            },
            borderRadius: 5,
            borderWidth: 0,
            color: 'black',
            font: function (context) {
              var width = context.chart.width;
              var size = Math.round(width / 60);
              return {
                size: size,
                weight: 600,
                font: 'Lato'
              };
            },
            formatter: this.belongsTo === 'historyPage' ?
                function (value, context) { return null }
              : function (value, context) {
                return (context.chart.data.labels[context.dataIndex] + ' ' + context.chart.data.datasets[0].data[context.dataIndex]);
               }
          }
        }
      }
    });

    //This code down below is to fix a bug where I could not modify the scale in the options
    //key in the above code (It threw a typescript error even though it worked)

    this.chart.config.options.scale.ticks.min = 0;
    this.chart.config.options.scale.ticks.max = 10;
    this.chart.update();
  }

}


