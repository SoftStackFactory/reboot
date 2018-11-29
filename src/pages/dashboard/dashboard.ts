import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { TimelinePage } from '../timeline/timeline';
import { Storage } from '@ionic/storage'
import { ChartProvider } from '../../providers/chart/chart';
import { UserProvider} from '../../providers/user/user';


@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  name: any
  date: any

  constructor(public navCtrl: NavController, public navParams: NavParams,public chartProvider: ChartProvider, private toastCtrl: ToastController, 
    //private storage: Storage,
    public user: UserProvider) { }

  /* commenting out for demo

  ionViewWillLoad() {
    this.storage.get('userInfo').then((val) => {
      this.name = val ? `${val.firstName} ${val.lastName}` : '';
    })
    this.storage.get('chartData').then((val) => {
      this.date = val ? val.Date : '';
    }).then(() => this.lastDate())
  }

  End of comment for demo */

  toTimeline() {
    this.navCtrl.setRoot(TimelinePage);
  }
}
