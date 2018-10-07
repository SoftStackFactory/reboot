import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RegisterPage } from '../register/register';

import { UserProvider } from '../../providers/user/user'
import { DashboardPage } from '../dashboard/dashboard';

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

  private loginCreds : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _userService: UserProvider, private formBuilder: FormBuilder) {
    this.loginCreds = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      password: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this._userService.login(this.user)
      .subscribe(
        (res) => {
          alert("you're logged in!")
          this.navCtrl.setRoot(DashboardPage);
        },
        (err) => alert("Invalid credentials")
      )
  }

  toRegisterPage() {
    this.navCtrl.push(RegisterPage)
  }

  toDashboard() {
    this.navCtrl.setRoot(DashboardPage);
  }
}
