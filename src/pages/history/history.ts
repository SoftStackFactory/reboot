import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChartProvider } from '../../providers/chart/chart';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  historyPage: any = 'historyPage';

  constructor(public navCtrl: NavController, public navParams: NavParams, public chartProvider: ChartProvider) {
  }

}
