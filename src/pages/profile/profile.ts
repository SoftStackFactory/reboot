import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public user :UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  onLogout() {
    // this.user.logoutUser(window.sessionStorage.getItem('token'))
    //   .subscribe( response => {
    //     console.log('onsubscibe-logout')
    //     window.sessionStorage.clear()
    //   })
  }

}
