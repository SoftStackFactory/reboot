import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { TimelinePage } from '../timeline/timeline';
import { Storage } from '@ionic/storage'

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  name: any
  date: any

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private storage: Storage) { }

  ionViewWillLoad() {
    this.storage.get('userInfo').then((val) => {
      this.name = val.firstName + ' ' + val.lastName
      console.log('this.name:', this.name)
    })
    this.storage.get('chartData').then((val) => {
      this.date = val.Date
    }).then(() => this.lastDate())
  }

  toTimeline() {
    this.navCtrl.setRoot(TimelinePage);
  }

  lastDate() {
    let toast = this.toastCtrl.create({
      message: "Your last assessment was "+ this.date,
      duration: 2500,
      position: 'middle'
    });

    toast.present();
  }
}
