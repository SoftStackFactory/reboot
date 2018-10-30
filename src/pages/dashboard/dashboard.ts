import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { TimelinePage } from '../timeline/timeline';
import { Storage } from '@ionic/storage'
import { ChartProvider } from '../../providers/chart/chart';


@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  name: any
  date: any

  constructor(public navCtrl: NavController, public navParams: NavParams,public chartProvider: ChartProvider, private toastCtrl: ToastController, private storage: Storage) { }

  ionViewWillLoad() {
    this.storage.get('userInfo').then((val) => {
      this.name = val ? `${val.firstName} ${val.lastName}` : '';
    })
    this.storage.get('chartData').then((val) => {
      this.date = val ? val.Date : '';
    }).then(() => this.lastDate())
  }

  toTimeline() {
    this.navCtrl.setRoot(TimelinePage);
  }

  lastDate() {
    let toast = this.toastCtrl.create({
      message: `Your last assessment was ${this.date}`,
      duration: 2500,
      position: 'middle'
    });

    toast.present();
  }
}
