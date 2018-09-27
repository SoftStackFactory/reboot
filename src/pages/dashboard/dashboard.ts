import { Component } from '@angular/core';
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

  chart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.chart = new Chart('canvas', {
      type: 'polarArea',
      data: {
        labels: ["Career", "Finance", "Personal \n Growth", "Health", "Family", "relationships", "social life", "attitude"],
        datasets: [
          {
            backgroundColor: ["blue", "red", "purple", "green", "orange", "teal", "magenta", "lime"],
            borderColor: "black",
            data: [10, 9, 4, 10, 7, 8, 5, 1]
          }
        ]
      },

      options: {
        layout: {
          padding: {
            top: 50,
            bottom: 50
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
              let chart: any = document.getElementById('canvas').getAttribute('width');
              return chart / 6 - 110;
            },
            backgroundColor: function (context) {
              return context.dataset.backgroundColor;
            },
            borderColor: 'black',
            rotation: function (context) { if (context.dataIndex === 0 || context.dataIndex === 1 || context.dataIndex === 6 || context.dataIndex === 7) { return 45 / 2 + (45 * context.dataIndex) } else { return 45 / 2 + (45 * context.dataIndex) + 180 } },
            borderRadius: 5,
            borderWidth: 2,
            color: 'white',
            font: {
              weight: 'bold',
              size: '20'
            },
            formatter: function (value, context) {
              return context.chart.data.labels[context.dataIndex] + ' ' + context.chart.data.datasets[0].data[context.dataIndex];
            }
          }
        }
      }
    });
  }

}
