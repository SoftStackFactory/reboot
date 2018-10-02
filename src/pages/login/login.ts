import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RegisterPage} from '../register/register';

import {UserProvider} from '../../providers/user/user'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: any = {
    email: '',
    password: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public _userService: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this._userService.login(this.user)
      .subscribe(
        (res) => alert("you're logged in!"),
        (err) => alert("Invalid credentials")
      )
  }

  toRegisterPage() {
    this.navCtrl.push(RegisterPage)
  }
}
