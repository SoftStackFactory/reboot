import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { SelfAssessmentPage } from '../self-assessment/self-assessment';
import { DashboardPage } from '../dashboard/dashboard';

interface UserData {
  firstName: any,
  lastName: any
}
interface ChartData {
  Career: number, 
  Finance: number,
  PersonalGrowth: number, 
  Health: number, 
  Family: number,
  Relationships: number, 
  SocialLife: number, 
  Attitude: number
}
@IonicPage()
@Component({
  selector: 'page-resources',
  templateUrl: 'resources.html',
})
export class ResourcesPage {

  user: any = {
    firstName : 'Peter',
    lastaname : 'Horton',
    lowestScore: 2,
    lowScoreName: 'Finances'
    }

    lowestResource: any = {};

    values: Array<any> = [];
  
    //Resource tempate resources data
  resources: any = [
    {
      title: 'Career',
      message: 'How is your career going? We spend a lot of time working so how is it for you? Does it excite you? Have you a clear idea what it is you want to achieve?',
      modalMessage: 'How is your career going? We spend a lot of time working so how is it for you? Does it excite you? Have you a clear idea what it is you want to achieve?'
    },
    {
      title: 'Finances',
      message: 'This is not about how much you have but rather how you relate to money. There are some millionaires who worry themselves sick about money so might score very low here and others who have just enough to get by and simply go with the flow.',
      modalMessage: 'This is not about how much you have but rather how you relate to money. There are some millionaires who worry themselves sick about money so might score very low here and others who have just enough to get by and simply go with the flow.'
    },
    {
      title: 'Personal Growth',
      message: 'People who are truly successful commit themselves continually to learning and improving themselves. Are you a 10 – committed to learning as much as you can about life?',
      modalMessage: 'People who are truly successful commit themselves continually to learning and improving themselves. Are you a 10 – committed to learning as much as you can about life?'
    },
    {
      title: 'Health',
      message: 'We all take our health for granted until it lets us down. How is yours? Do you look after yourself? Are you eating well? Do you get regular exercise?',
      modalMessage: 'We all take our health for granted until it lets us down. How is yours? Do you look after yourself? Are you eating well? Do you get regular exercise?'
    },
    {
      title: 'Family',
      message: 'Family life is very important. Although family life should be loving, caring and supportive it often is not for a variety of reasons such as crying babies, wild teenage sons or daughters or constant arguments and tension.',
      modalMessage: 'Family life is very important. Although family life should be loving, caring and supportive it often is not for a variety of reasons such as crying babies, wild teenage sons or daughters or constant arguments and tension.'
    },
    {
      title: 'Relationships',
      message: 'Consider the key relationship you have whether it is with your boyfriend/girlfriend husband/wife/friend or family member.',
      modalMessage: 'Consider the key relationship you have whether it is with your boyfriend/girlfriend husband/wife/friend or family member.'
    },
    {
      title: 'Social Life',
      message: 'This can be about the quality of your social life which can score very low for people with busy careers. However you can also decide to score it based on how you interact with people as how often you get to socialise. A vital component of life is the need to get on and interact with people.',
      modalMessage: 'This can be about the quality of your social life which can score very low for people with busy careers. However you can also decide to score it based on how you interact with people as how often you get to socialise. A vital component of life is the need to get on and interact with people.'
    },
    {
      title: 'Attitude',
      message: 'Attitude is vital and can influence every aspect of your life. Is your glass half full or half empty?',
      modalMessage: 'Attitude is vital and can influence every aspect of your life. Is your glass half full or half empty?'
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public modalCtrl: ModalController,
  public userPro: UserProvider) {
      this.userPro.getUser(window.sessionStorage.getItem('userId'))
    .subscribe((data: UserData) => {
      this.user.firstName = data.firstName;
      this.user.lastName = data.lastName;
    });
    this.userPro.getUserChart(window.sessionStorage.getItem('userId'))
    .subscribe( (data: ChartData) => {
      console.log(data);
      this.values = data[0].data;
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
    this.userPro.updateUserModel(this.userPro.userData, window.sessionStorage.getItem('userId'))
    console.log(this.values)
  });
  }


  openModal(data) {
  const resModal = this.modalCtrl.create('ResourceModalPage',{data:data})

   resModal.present();
  }

  openSelfAssessment() {
    this.navCtrl.setRoot(SelfAssessmentPage);
  }

  openDashboard() {
    this.navCtrl.setRoot(DashboardPage);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ResourcesPage');
  }

}