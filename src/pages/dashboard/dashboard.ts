import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { TimelinePage } from '../timeline/timeline';
import { Storage } from '@ionic/storage'
import { ChartProvider } from '../../providers/chart/chart';
import { UserProvider } from '../../providers/user/user';
import * as moment from 'moment';
import { NewsPage } from '../news/news';
import { ActionItemProvider } from '../../providers/action-item/action-item';
import { SelfAssessmentPage } from '../self-assessment/self-assessment';

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
  assessDate: any;
  daysTilSep: any
  daysTilSepAbs: any
  currentActionItem: String;
  prevAssess: boolean = false;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public chartProvider: ChartProvider, 
    private toastCtrl: ToastController, 
    private storage: Storage,
    public user: UserProvider,
    public actionItem: ActionItemProvider) {
     this.currentActionItem = this.actionItem.currentItem;
    }

  //  commenting out for demo

  ionViewWillLoad() {
    // this.storage.get('userInfo').then((val) => {
    //   this.name = val ? `${val.firstName} ${val.lastName}` : '';
    // })

    // this.storage.get('chartData').then((val) => {
    //   this.assessDate = val ? val.Date : '';
    // }).then(() => this.lastDate())
  
    this.user.getUser()
    .subscribe( (data:UserData)=> {
      this.name = data.firstName;
      let sepDate = moment(data.separationDate, "YYYY-MM-DD").toDate().getTime();
      let now = new Date().getTime();
      console.log(now, 'now');
      this.daysTilSep = Math.ceil((sepDate - now)/86400000);
      this.daysTilSepAbs = Math.abs(this.daysTilSep);
      console.log(this.daysTilSep, this.name)
    })
    this.user.getUserChart()
    .subscribe( (data: Array<any>) => {
      if (!data.length) return
      this.prevAssess = true;
      this.assessDate = moment(data[0].date.substring(0,10), "YYYY-MM-DD").toDate().getTime();
      console.log(this.assessDate, 'first');  
      let now = new Date().getTime();
      this.assessDate = Math.ceil((this.assessDate - now)/86400000);
      console.log(this.assessDate, 'second');  
      this.assessDate = Math.abs(this.assessDate);
      console.log(data);
      console.log(this.assessDate, 'third');  
    }, error => {console.log("error")},
    () => {
      this.lastDate();
    });
  }

  toSelfAssessment() {
    this.navCtrl.setRoot(SelfAssessmentPage);
  }

  // End of comment for demo */

  toTimeline() {
    this.navCtrl.setRoot(TimelinePage);
  }

  lastDate() {
    let msg = this.assessDate === undefined?
                                  `You have not completed any assesments`:      
                                  `Your last assessment was ${this.assessDate} day(s) ago`

    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2500,
      position: 'middle',
      cssClass: 'toaster',
    });
    console.log(this.assessDate, 'fourth');  
    toast.present();
  }

  toNews() {
    this.navCtrl.push(NewsPage);
  }

}
