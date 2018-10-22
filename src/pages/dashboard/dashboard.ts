import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TimelinePage } from '../timeline/timeline';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  toTimeline() {
    this.navCtrl.setRoot(TimelinePage);
  }
}
