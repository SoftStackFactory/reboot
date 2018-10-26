import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TimelinePage } from '../timeline/timeline';
import { Storage } from '@ionic/storage'; 

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) { }

  ionViewWillLoad() {
    this.storage.get('userData').then((val) => {
      console.log('val:', val)
    })
  }

  toTimeline() {
    this.navCtrl.setRoot(TimelinePage);
  }
}
