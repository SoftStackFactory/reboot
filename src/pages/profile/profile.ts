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

  editting: boolean;
  userInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _user :UserProvider) {
  }

  onLogout() {
    this._user.logoutUser(window.sessionStorage.getItem('token'))
      .subscribe( response => {
        console.log('onsubscibe-logout')
        window.sessionStorage.clear()
      })
  }

  getUserInfo() {
    let userID = sessionStorage.getItem('userId')
    // let token = sessionStorage.getItem('token')
    this._user.getUser(userID)
    .subscribe(response => {
      console.log('received user data')
      console.log(response)
      this.userInfo = response;
    })
  }



  allowEdit() {
    this.editting = true;
  }

  updateProfile() {
    this.editting = false;
    // let loader = this.loader.create({
    // })
    // loader.present()
    // this._user.updateUser()
    //   .subscribe(_ => {
    //     loader.dismiss();
    //     this.editting = false;
    //   }, err => {
    //     console.error(err)
    //     loader.dismiss()
    //     let toast = this.toastCtrl.create({
    //       message: 'Unable to update at this time',
    //       duration: 2000,
    //       position: 'top'
    //     });
    //     toast.present()
    //   })
  }

  //todo connect backend for update user object
  updateUser() {

  }

}
