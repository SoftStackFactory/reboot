import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TimelinePage } from '../timeline/timeline';
import { ChartProvider } from '../../providers/chart/chart';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public chartProvider: ChartProvider) { }

  toTimeline() {
    this.navCtrl.setRoot(TimelinePage);
  }
}
