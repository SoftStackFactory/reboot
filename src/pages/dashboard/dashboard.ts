import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { TimelinePage } from '../timeline/timeline';
import { Storage } from '@ionic/storage'
import { ChartProvider } from '../../providers/chart/chart';
import { UserProvider } from '../../providers/user/user';
import * as moment from 'moment';
import { NewsPage } from '../news/news';

interface UserData {
  firstName: any,
  separationDate: any
}

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  name: any
  date: any
  daysTilSep: any
  daysTilSepAbs: any

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public chartProvider: ChartProvider, 
    private toastCtrl: ToastController, 
    private storage: Storage,
    public user: UserProvider) { }

  ionViewWillLoad() {
    // this.storage.get('userInfo').then((val) => {
    //   this.name = val ? `${val.firstName} ${val.lastName}` : '';
    // })

    this.storage.get('chartData').then((val) => {
      this.date = val ? val.Date : '';
    }).then(() => this.lastDate())
  
    this.user.getUser(window.sessionStorage.getItem('userId'))
    .subscribe( (data:UserData)=> {
      this.name = data.firstName;
      let sepDate = moment(data.separationDate, "YYYY-MM-DD").toDate().getTime();
      let now = new Date().getTime();
      this.daysTilSep = Math.ceil((sepDate - now)/86400000);
      this.daysTilSepAbs = Math.abs(this.daysTilSep);
      console.log(this.daysTilSep, this.name)
    })
  }

  toTimeline() {
    this.navCtrl.setRoot(TimelinePage);
  }

  lastDate() {
    let toast = this.toastCtrl.create({
      message: `Your last assessment was ${this.date}`,
      duration: 2500,
      position: 'middle'
    });

    toast.present();
  }
  toNews() {
    this.navCtrl.push(NewsPage);
  }}
