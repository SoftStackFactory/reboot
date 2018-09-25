import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
// import { Plotly } from 'plotly.js-dist';

/**
 * Generated class for the TransitionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-transition',
  templateUrl: 'transition.html',
})
export class TransitionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  chart: Chart;

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransitionPage');

    this.chart = new Chart('canvas', {
      type: 'radar',
      data: {
        labels: ["Career", "Finance", "Personal Growth", "Health", "Family", "relationships", "social life", "attitude"],
        datasets: [
          {
            backgroundColor: "rgba(100,100,220,0.5)",
            borderColor: "rgba(255,255,255,0)",
            data: [2, 2, 0]
          },
          {
            backgroundColor: "rgba(100,200,220,0.5)",
            borderColor: "rgba(255,255,255,1)",
            data: [0, 3, 3, 0]
          },
          {
            backgroundColor: "rgba(255,200,220,1)",
            borderColor: "rgba(255,255,255,1)",
            data: [0, 0, 4, 4, 0]
          },
          {
            backgroundColor: "rgba(205,55,255,1)",
            borderColor: "rgba(255,255,255,1)",
            data: [0, 0, 0, 5, 5, 0]
          },
          {
            backgroundColor: "rgba(50,55,255,1)",
            borderColor: "rgba(255,255,255,1)",
            data: [0, 0, 0, 0, 6, 6, 0]
          },
          {
            backgroundColor: "rgba(50,155,0,1)",
            borderColor: "rgba(255,255,255,1)",
            data: [0, 0, 0, 0, 0, 7, 7, 0]
          },
          {
            backgroundColor: "rgba(200,155,0,0.5)",
            borderColor: "rgba(255,255,255,1)",
            data: [0, 0, 0, 0, 0, 0, 8, 8, 0]
          },
          {
            backgroundColor: "rgba(100,200,50,0.5)",
            borderColor: "rgba(255,255,255,0)",
            data: [0, 0, 0, 0, 0, 0, 0, 10, 10, 0]
          }
        ]
      },

      options: {
        title: {
          display: false,
          text: 'Color test'
        },
         scale: {
    ticks: {
      min: 0,
      max: 10
    }
  },
  legend: {
            display: false
         }
      }
    });
  }
  

}
