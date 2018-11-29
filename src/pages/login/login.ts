import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RegisterPage } from '../register/register';
import { DashboardPage } from '../dashboard/dashboard';
import { UserProvider } from '../../providers/user/user'
import { Storage } from '@ionic/storage';
import { ChartProvider } from '../../providers/chart/chart';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  /* Commenting out for demo 
  dummyChart: any = {
    Date: "10/29/2018",
    Data: [8, 2, 5, 10, 3, 5, 6, 8]
  }

  getDummyChart: any
  user: any
  userId: any
  loginResponse: any;

  End comment for demo */

  private loginCreds : FormGroup;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public _userService: UserProvider, 
              private formBuilder: FormBuilder, 
              private storage: Storage,
              private chartProvider: ChartProvider,
              private toastCtrl: ToastController) {
    this.loginCreds = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
    });
  }

  /* Right now the flow of login in the function below is as follows:
     1) User is logged in and their userId stored in session storage
     2) The user's historical chart data is retrieved
     3) Then the user is navigated to the dashboard page
  */

  login() {
    /* Commenting out for the demo

    this._userService.login(this.loginCreds.value)
      .subscribe(
        (res) => {
          // console.log('res:', res)
          // this.userId = res.userId
          // this.storage.remove('userData')
          // this.storage.remove('chartData')
          // this.storage.set('userData', res)
          // this.storage.set('chartData', this.dummyChart)
          // this.storage.get('chartData').then((val) => {
          //   this.getDummyChart = val.Data
          // }).then(() => {
          //   this._chart.data = this.getDummyChart
          // }).then(() => {
          //   this._userService.getUser(this.userId)
          //     .subscribe(
          //       (res) => {
          //         this.storage.set('userInfo', res)
          //       }
          //     )
          // }).then(() => {
          //   this.toDashboard()
          // })
          this.loginResponse = res;
          sessionStorage.setItem('userId', this.loginResponse.userId)
          sessionStorage.setItem('token', this.loginResponse.token);
          alert("you're logged in!")
          this.getChartData();
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

      Comment end for demo */

      this.toDashboard();
  }

  toRegisterPage() {
    this.navCtrl.push(RegisterPage)
  }

  /*Commenting out for demo

  getChartData() {
    this.chartProvider.getChartHistory()
      .subscribe((res) => {
        this.chartProvider.chartHistory = res;
        this.chartProvider.chartHistory.reverse(); // Reversing orders array from most recent to least recent chart data
        this.chartProvider.mostRecentChart = this.chartProvider.chartHistory[0].data;
        this.toDashboard();
      },
        (err) => console.log(err)

      );
  }

  End comment for demo */

  toDashboard() {
    let toast = this.toastCtrl.create({
      message: "Login successful! Your last assessment was on 11/26/2018.",
      duration: 2500,
      position: 'middle',
      cssClass: 'toasts' // You can find the css class in app.scss
    });
  
    toast.present();
    this.navCtrl.setRoot(DashboardPage)
  }
}
