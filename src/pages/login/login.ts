import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, MenuController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RegisterPage } from '../register/register';
import { DashboardPage } from '../dashboard/dashboard';
import { UserProvider } from '../../providers/user/user'
import { Storage } from '@ionic/storage';
import { ChartProvider } from '../../providers/chart/chart';
import { WizardPage } from '../wizard/wizard';

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
  // loginResponse: any;
  checkResponse: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _userService: UserProvider,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private chartProvider: ChartProvider,
    private toastCtrl: ToastController,
    private menuCtrl: MenuController,
  ) {
    this.loginCreds = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9!@#$%&*?]*'), Validators.required])],
    });
  }

  /* Right now the flow of login in the function below is as follows:
     1) User is logged in and their userId stored in session storage
     2) The user's historical chart data is retrieved
     3) Then the user is navigated to the dashboard page
  */

  login() {
    this._userService.login(this.loginCreds.value)
      .subscribe(
        (res) => {
          this.menuCtrl.enable(true);
          this.menuCtrl.swipeEnable(true);
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
          // this.loginResponse = res;
          console.log(res);
          this._userService.setCredentials(res);
          alert("you're logged in!");
          // this.navCtrl.setRoot(WizardPage);
          //this.getChartData();
          this.firstTimeUserCheck()
        },
        (err) => {
          let toast = this.toastCtrl.create({
            message: "Invalid credentials",
            duration: 2500,
            position: 'middle'
          })
          if (err.error === 'Operating on offline mode') {
            toast.setMessage('Unable to login, in offline mode.')
          }
          toast.present()
        }
      )    
  }

  toRegisterPage() {
    this.navCtrl.push(RegisterPage)
  }

  /// Commenting out for relevancy,
  /// TODO: Review if this is still needed.
  // getChartData() {
  //   this.chartProvider.getChartHistory()
  //     .subscribe((res) => {
  //       this.chartProvider.chartHistory = res;
  //       this.chartProvider.chartHistory.reverse(); // Reversing orders array from most recent to least recent chart data
  //       this.chartProvider.mostRecentChart = this.chartProvider.chartHistory[0].data;
  //       this.toDashboard();
  //     },
  //       (err) => console.log(err)
  //     );
  // }

  // toDashboard() {
  //   let toast = this.toastCtrl.create({
  //     message: "Login successful!",
  //     duration: 2500,
  //     position: 'middle'
  //   });

  //   toast.onDidDismiss(() => {
  //     this.navCtrl.setRoot(DashboardPage)
  //   });

  //   toast.present();
  // }

  ionViewWillEnter() {
    this.logInCheck();
  }

  firstTimeUserCheck() {
    this._userService.getUser()
    .subscribe(response => {
      this.checkResponse = response;
      console.log(this.checkResponse)
      if (this.checkResponse.militaryBranch) {
        this.navCtrl.setRoot(DashboardPage);
              } else {
        this.navCtrl.setRoot(WizardPage);        
      }
    })
  }

  logInCheck() {
    let activeId = window.sessionStorage.getItem('userId');
    let activeToken = window.sessionStorage.getItem('token');

    if (activeId != null) {
      this.menuCtrl.enable(true);
      this.menuCtrl.swipeEnable(true);
      this.firstTimeUserCheck()
    }
  }
}