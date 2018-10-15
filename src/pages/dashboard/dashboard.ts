import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import 'chartjs-plugin-datalabels';


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

  ionViewDidLoad() {
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'polarArea',
      data: {
        labels: ["Career", "Finance", "Personal \n Growth", "Health", "Family", "Relationships", "Social life", "Attitude"],
        datasets: [
          {
            backgroundColor: ["rgba(0,0,255, .6)", "rgba(255,0,0, .6)", "rgba(128,0,128, .6)", "rgba(0,128,0, .6)", "rgba(255,165,0, .6)", "rgba(0,128,128, .6)", "rgba(255,0,255, .6)", "rgba(0,255,0, .6)"],
            borderColor: "black",
            data: [10, 0, 5, 2, 2, 5, 8, 1]
          }
        ]
      },

      //Everything above this point relates to the chart data itself and everything below this point
      //customizes the chart's appearance

      options: {
        scales: {
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 10
          },
        },

        //This layout.padding setting basically is to create room for the labels that circle the chart
        layout: {
          padding: {
            top: 55,
            bottom: 55
          }
        },
        legend: {
          display: false
        },

        //Everything here on down deals with the datalabels plugin
        plugins: {
          datalabels: {
            textAlign: 'center',

            //anchor, align, and offset are all used to position the labels. the anchor value sets the anchor point from which you'll relate a label's position
            //align defines what direction you'll position your labels relative to the anchor point
            //offset defines how far away from the anchor point you will position the labels
            //For more explanation: https://chartjs-plugin-datalabels.netlify.com/positioning.html
            anchor: 'start',
            align: 'end',

            //Notice the value for this one is dynamic, changing based on the width of the chart (which changes depending on the size of the screen)
            //"context" is a useful object that contains data about the chart itself
            offset: function (context) {
              let chartWidth = context.chart.width;
              return chartWidth / 3.6 - 55;
            },
            //matches background color of data, with less opacity
            backgroundColor: ["rgba(0,0,255, .2)", "rgba(255,0,0, .2)", "rgba(128,0,128, .2)", "rgba(0,128,0, .2)", "rgba(255,165,0, .2)", "rgba(0,128,128, .2)", "rgba(255,0,255, .2)", "rgba(0,255,0, .2)"],
            
            borderColor: 'black',

            //This is what rotates the labels to match the angle of its pie slice. context is again used here, but this time to reference each datapoints' index in the array
            rotation: function (context) {
              if (context.dataIndex === 0 || context.dataIndex === 1 || context.dataIndex === 6 || context.dataIndex === 7) { return 45 / 2 + (45 * context.dataIndex) }
              else { return 45 / 2 + (45 * context.dataIndex) + 180 }
            },

            //This is to edit how round the border is for the datalabels
            borderRadius: 5,

            borderWidth: 0,
            color: 'black',

            //This function scales the font's size based on the chart's width
            font: function (context) {
              var width = context.chart.width;
              var size = Math.round(width / 60);
              return {
                size: size,
                weight: 600,
                font: 'Lato'
              };
            },

            //This function is what allows us to display the label as well as the value of the data associated with that label
            formatter: function (value, context) {
              return context.chart.data.labels[context.dataIndex] + ' ' + context.chart.data.datasets[0].data[context.dataIndex];
            }
          }
        }
      }
    });
    //This code down below is to fix a bug where I could not modify the scale in the options
    //key in the above code (It threw a typescript error even though it worked)
    this.chart.config.options.scale.ticks.beginAtZero = true;
    this.chart.config.options.scale.ticks.min = 0;
    this.chart.config.options.scale.ticks.max = 10;
    this.chart.config.options.scale.ticks.stepSize = 1;
    this.chart.update();
  }

}
