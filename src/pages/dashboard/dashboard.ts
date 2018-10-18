import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import 'chartjs-plugin-datalabels';

import { TimelinePage} from '../timeline/timeline';


/**
 * Generated class for the DashboardPage page. 
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  @ViewChild('canvas') canvas;
  chart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

/** This block of code is for everything contained in ionViewDidLoad right below it
 *
 Everything above the options property in the chart code below relates to the chart data. Everything below that property modifies the display in some way.
 
 Everything below the plugins property in options relates to the snazzy labels that surround the chart.

 The layout.padding property gives room for the snazzy labels.

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

ionViewDidLoad() {
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'polarArea',
      data: {
        labels: ["Career", "Finance", "Personal \n Growth", "Health", "Family", "Relationships", "Social life", "Attitude"],
        datasets: [
          {
            backgroundColor: ["rgba(0,0,255, .6)", "rgba(255,0,0, .6)", "rgba(128,0,128, .6)", "rgba(0,128,0, .6)", "rgba(255,165,0, .6)", "rgba(0,128,128, .6)", "rgba(255,0,255, .6)", "rgba(0,255,0, .6)"],
            borderColor: "black",
            data: [1, 1, 1, 1, 1, 1, 1, 2]
          }
        ]
      },

      options: {
        layout: {
          padding: {
            top: 55,
            bottom: 55
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
              return chartWidth / 3.6 - 55;
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
            formatter: function (value, context) {
              return context.chart.data.labels[context.dataIndex] + ' ' + context.chart.data.datasets[0].data[context.dataIndex];
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

  toTimeline() {
    this.navCtrl.setRoot(TimelinePage);
  }
}
