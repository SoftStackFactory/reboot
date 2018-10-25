import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChartComponent } from '../../components/chart/chart';
import { ChartProvider } from '../../providers/chart/chart';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  chartHistory: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public chartProvider: ChartProvider) {
  }

  ionViewDidLoad() {
    this.chartProvider.getHistory()
      .subscribe((res) => {this.chartHistory = res; console.log(this.chartHistory)},
      (err) => console.log(err)

      );
  }

}
