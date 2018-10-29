import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { RegisterPage } from '../register/register';
import { DashboardPage } from '../dashboard/dashboard';

import { UserProvider } from '../../providers/user/user'
import { ChartProvider } from '../../providers/chart/chart'
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  dummyChart: any = {
    Date: "10/29/2018",
    Data: [8, 2, 5, 10, 3, 5, 6, 8]
  }

  getDummyChart: any

  private loginCreds : FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public _userService: UserProvider, 
              private formBuilder: FormBuilder, 
              private storage: Storage,
              private _chart: ChartProvider,
              private alertCtrl: AlertController) {
    this.loginCreds = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this._userService.login(this.loginCreds.value)
      .subscribe(
        (res) => {
          this.storage.remove('userData')
          this.storage.remove('chartData')
          this.storage.set('userData', res)
          this.storage.set('chartData', this.dummyChart)
          this.storage.get('chartData').then((val) => {
            this.getDummyChart = val.Data
          }).then(() => {
            this._chart.data = this.getDummyChart
          }).then(() => {
            this.toDashboard()
          })
        },
        (err) => alert("Invalid credentials")
      )
  }

  toRegisterPage() {
    this.navCtrl.push(RegisterPage)
  }

  toDashboard() {
    //alert("you're logged in!")
    this.presentAlert()
    //this.navCtrl.setRoot(DashboardPage);
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Low battery',
      subTitle: '10% of battery remaining'
    });
    alert.present().then(() => {
      this.navCtrl.setRoot(DashboardPage)
    });
  }
}
