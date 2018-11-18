import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ResourcesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resources',
  templateUrl: 'resources.html',
})
export class ResourcesPage {

  user: any = {
    firstName : 'Peter',
    lastaname : 'Horton',
    lowestScore: '3'
    }
  

  resources: any = [
    {
      title: 'Carrer',
      message: 'How is your career going? We spend a lot of time working so how is it for you? Does it excite you? Have you a clear idea what it is you want to achieve',
    },
    {
      title: 'Finances',
      message: 'This is not about how much you have but rather how you relate to money. There are some millionaires who worry themselves sick about money so might score very low here and others who have just enough to get by and simply go with the flow.'
    },
    {
      title: 'Personal Growth',
      message: 'People who are truly successful commit themselves continually to learning and improving themselves. Are you a 10 – committed to learning as much as you can about life?'
    },
    {
      title: 'Health',
      message: 'We all take our health for granted until it lets us down. How is yours? Do you look after yourself? Are you eating well? Do you get regular exercise?'
    },
    {
      title: 'Family',
      message: 'Family life is very important. Although family life should be loving, caring and supportive it often is not for a variety of reasons such as crying babies, wild teenage sons or daughters or constant arguments and tension.'
    },
    {
      title: 'Relationships',
      message: 'Consider the key relationship you have whether it is with your boyfriend/girlfriend husband/wife/friend or family member.'
    },
    {
      title: 'Social Life',
      message: 'This can be about the quality of your social life which can score very low for people with busy careers. However you can also decide to score it based on how you interact with people as how often you get to socialise. A vital component of life is the need to get on and interact with people.'
    },
    {
      title: 'Attitude',
      message: 'Attitude is vital and can influence every aspect of your life. Is your glass half full or half empty?'
    }
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResourcesPage');
  }

}
