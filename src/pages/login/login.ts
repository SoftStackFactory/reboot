import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { RegisterPage } from '../register/register';
import { DashboardPage } from '../dashboard/dashboard';

import { UserProvider } from '../../providers/user/user'
import { ChartProvider } from '../../providers/chart/chart';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private loginCreds: FormGroup;
  loginResponse: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _userService: UserProvider, public chartProvider: ChartProvider, private formBuilder: FormBuilder) {
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
    this._userService.login(this.loginCreds.value)
      .subscribe(
        (res) => {
          this.loginResponse = res;
          sessionStorage.setItem('userId', this.loginResponse.userId)
          alert("you're logged in!")
          this.getChartData();
        },
        (err) => alert("Invalid credentials")
      )
  }

  toRegisterPage() {
    this.navCtrl.push(RegisterPage)
  }

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

  toDashboard() {
    this.navCtrl.setRoot(DashboardPage);
  }
}
