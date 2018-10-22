import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.storage.get('regUser').then((val) => {
      console.log('regUser from profile:', val);
      this.user = val
    });
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter ProfilePage');
    console.log('user:', this.user)
  }

}
