import { Component } from '@angular/core';
import {  NavController, NavParams, ModalController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { SelfAssessmentPage } from '../self-assessment/self-assessment';
import { DashboardPage } from '../dashboard/dashboard';
import { HistoryPage } from '../history/history';

interface UserData {
  firstName: any,
  lastName: any
}


@Component({
  selector: 'page-resources',
  templateUrl: 'resources.html',
})
export class ResourcesPage {
  //user model to be pushed to
  user: any = {};
  values: Array<any> = [];
  assessmentCompleted: boolean = false;
  sortedResources: Array<any> = [];  

  //Resource tempate resources data
  resources: any = [
    {
      title: 'Career',
      message: 'How is your career going? We spend a lot of time working so how is it for you? Does it excite you? Have you a clear idea what it is you want to achieve?',
      modalMessage: 'How is your career going? We spend a lot of time working so how is it for you? Does it excite you? Have you a clear idea what it is you want to achieve?',
      score: 0,
      img: 'assets/imgs/career-photo.jpg'
    },
    {
      title: 'Finances',
      message: 'This is not about how much you have but rather how you relate to money. There are some millionaires who worry themselves sick about money so might score very low here and others who have just enough to get by and simply go with the flow.',
      modalMessage: 'This is not about how much you have but rather how you relate to money. There are some millionaires who worry themselves sick about money so might score very low here and others who have just enough to get by and simply go with the flow.',
      score: 0      
    },
    {
      title: 'Personal Growth',
      message: 'People who are truly successful commit themselves continually to learning and improving themselves. Are you a 10 – committed to learning as much as you can about life?',
      modalMessage: 'People who are truly successful commit themselves continually to learning and improving themselves. Are you a 10 – committed to learning as much as you can about life?',
      score: 0
    },
    {
      title: 'Health',
      message: 'We all take our health for granted until it lets us down. How is yours? Do you look after yourself? Are you eating well? Do you get regular exercise?',
      modalMessage: 'We all take our health for granted until it lets us down. How is yours? Do you look after yourself? Are you eating well? Do you get regular exercise?',
      score: 0
    },
    {
      title: 'Family',
      message: 'Family life is very important. Although family life should be loving, caring and supportive it often is not for a variety of reasons such as crying babies, wild teenage sons or daughters or constant arguments and tension.',
      modalMessage: 'Family life is very important. Although family life should be loving, caring and supportive it often is not for a variety of reasons such as crying babies, wild teenage sons or daughters or constant arguments and tension.',
      score: 0      
    },
    {
      title: 'Relationships',
      message: 'Consider the key relationship you have whether it is with your boyfriend/girlfriend husband/wife/friend or family member.',
      modalMessage: 'Consider the key relationship you have whether it is with your boyfriend/girlfriend husband/wife/friend or family member.',
      score: 0
    },
    {
      title: 'Social Life',
      message: 'This can be about the quality of your social life which can score very low for people with busy careers. However you can also decide to score it based on how you interact with people as how often you get to socialise. A vital component of life is the need to get on and interact with people.',
      modalMessage: 'This can be about the quality of your social life which can score very low for people with busy careers. However you can also decide to score it based on how you interact with people as how often you get to socialise. A vital component of life is the need to get on and interact with people.',
      score: 0
    },
    {
      title: 'Attitude',
      message: 'Attitude is vital and can influence every aspect of your life. Is your glass half full or half empty?',
      modalMessage: 'Attitude is vital and can influence every aspect of your life. Is your glass half full or half empty?',
      score: 0  
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController,
    public userPro: UserProvider) {
    this.userPro.getUser()
      .subscribe((data: UserData) => {
        console.log(data)
        this.user.firstName = data.firstName;
        this.user.lastName = data.lastName;
      });
    this.userPro.getUserChart()
    .subscribe((data: Array<any>) => {
      try{
        console.log(data);
        this.resources.forEach(x => x.score = data['0'].data[x.title]);
        this.sortedResources = this.resources.sort((a, b) => a.score - b.score);
        console.log(data);
        this.values = data[data.length - 1].data;
        let lowest = 10;
        let lowestProp: any;
        console.log("values",this.values);
        console.log(lowest); 
        for (var prop in this.values) {
          if (this.values[prop] < lowest) {
            lowest = this.values[prop];
            lowestProp = prop;
          }
            console.log(lowest, lowestProp);
      }
      this.userPro.userData.lowestScore = lowest;
      this.userPro.userData.lowScoreName = lowestProp;
      this.userPro.updateUserModel(this.userPro.userData)
      console.log(this.values)
      this.assessmentCompleted = true;
      console.log(data);
    } catch(e) {
      console.log('i ran')
      return 
    }
  });
  }


  openModal(data) {
    const resModal = this.modalCtrl.create('ResourceModalPage', { data: data })

    resModal.present();
  }

  openSelfAssessment() {
    this.navCtrl.setRoot(SelfAssessmentPage);
  }

  openChartHistory() {
    this.navCtrl.setRoot(HistoryPage);
  }

  openDashboard() {
    this.navCtrl.setRoot(DashboardPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResourcesPage');
  }

}