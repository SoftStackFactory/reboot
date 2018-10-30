import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { RegisterPage } from '../register/register';
import { DashboardPage } from '../dashboard/dashboard';

import { UserProvider } from '../../providers/user/user'
import { ChartProvider } from '../../providers/chart/chart'
import { Storage } from '@ionic/storage';


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
  user: any
  userId: any

  private loginCreds : FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public _userService: UserProvider, 
              private formBuilder: FormBuilder, 
              private storage: Storage,
              private _chart: ChartProvider,
              private toastCtrl: ToastController) {
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
          console.log('res:', res)
          this.userId = res.userId
          this.storage.remove('userData')
          this.storage.remove('chartData')
          this.storage.set('userData', res)
          this.storage.set('chartData', this.dummyChart)
          this.storage.get('chartData').then((val) => {
            this.getDummyChart = val.Data
          }).then(() => {
            this._chart.data = this.getDummyChart
          }).then(() => {
            this._userService.getUser(this.userId)
              .subscribe(
                (res) => {
                  this.storage.set('userInfo', res)
                }
              )
          }).then(() => {
            this.toDashboard()
          })
        },
        (err) => {
          let toast = this.toastCtrl.create({
            message: "Invalid credentials",
            duration: 2500,
            position: 'middle'
          })

          toast.present()
        }
      )
  }

  toRegisterPage() {
    this.navCtrl.push(RegisterPage)
  }

  toDashboard() {
    let toast = this.toastCtrl.create({
      message: "Login successful!",
      duration: 2500,
      position: 'middle'
    });
  
    toast.onDidDismiss(() => {
      this.navCtrl.setRoot(DashboardPage)
    });
  
    toast.present();
  }
}
