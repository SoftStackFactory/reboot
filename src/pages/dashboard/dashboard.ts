import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChartComponent } from '../../components/chart/chart';
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

  @ViewChild(ChartComponent) chartComponent;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  toTimeline() {
    this.navCtrl.setRoot(TimelinePage);
  }
}
