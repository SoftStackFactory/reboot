import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import * as moment from 'moment';
import { ChartProvider } from '../../providers/chart/chart'
import { ResourcesPage } from '../resources/resources'


/**
 * Generated class for the SelfAssessmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-self-assessment',
  templateUrl: 'self-assessment.html',
})
export class SelfAssessmentPage {
  areas: Array<any>;
  date: any;
  currentAssessment = { date: '', data: {}, appUserId: ''};
  addAssessment;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public chartProvider: ChartProvider, 
              private storage: Storage, 
              private toastCtrl: ToastController) {
              
                this.areas = [
                  {
                    title: 'Career',
                    expand: false,
                    intro: 'How is your career going? We spend a lot of time working, so how is it for you? Does it excite you? Do you have a clear idea of what it is you want to achieve?',
                    description: 'If you are not working, are you happy and know what career path you want to explore and are you taking steps to achieve this? Are you a 1 – you feel physically sick before you go to work each morning (and not because you have been enjoying the festive season too much) or are you a 10 – would you do your job without being paid for it?',
                    number: 0
                  },
                  {
                    title: 'Finances',
                    expand: false,
                    intro: 'This is not about how much you have but rather how you relate to money. There are some millionaires who worry themselves sick about money so they might score very low here and others who have just enough to get by and simply go with the flow.',
                    description: 'A 10 is someone totally at ease with money whereas a 1 is someone so worried about money that it is creating huge stress and limiting them in all their actions.',
                    number: 0
                  },
                  {
                    title: 'Personal Growth',
                    expand: false,
                    intro: 'People who are truly successful are continuously committed to learning and improving themselves. Are you a 10 – committed to learning as much as you can about life?',
                    description: ' Are you constantly experiencing new opportunities? Do you regularly read to learn and grow? Are you open to improving and stretching yourself? The fact that you are reading this demonstrates a certain level of commitment to develop yourself so you are not a 1 or even a 2.',
                    number: 0
                  },
                  {
                    title: 'Health',
                    expand: false,
                    intro: 'We all take our health for granted until it lets us down. How is yours? Do you look after yourself? Are you eating well? Do you get regular exercise?',
                    description: 'Having a long-term illness does not necessarily mean you need to give yourself a low score. The main thing is whether you are doing everything within your control to improve or regulate your condition.',
                    number: 0
                  },
                  {
                    title: 'Family',
                    expand: false,
                    intro: 'Family life is very important. Although family life should be loving, caring, and supportive it often is not for a variety of reasons such as crying babies, wild teenage sons or daughters, or constant arguments and tension.',
                    description: ' These all represent a huge challenge and will affect other areas of your life such as work / studies, relationships, and so on. In this respect, family life to you could mean a single unit or a more extended family. Whatever family life means to you give yourself a current score.',
                    number: 0
                  },
                  {
                    title: 'Relationships',
                    expand: false,
                    intro: 'Consider the key relationship you have whether it is with your boyfriend/girlfriend, husband/wife/friend, or family member.',
                    description: 'Where do you feel it is at? Where would you like it to be?',
                    number: 0
                  },
                  {
                    title: 'Social Life',
                    expand: false,
                    intro: 'This can be about the quality of your social life which can score very low for people with busy careers. However, you can also decide to score it based on how you interact with people or how often you get to socialise. A vital component of life is the need to get on and interact with people.',
                    description: 'How comfortable you are in social situations? Some people are the life and soul of every party, loved by all and fully confident yet sensitive whereas others will not want to speak up when there is a group of people around. Give yourself a score. Remember for this one that most 1s are locked up, so you can rule out that score.',
                    number: 0
                  },
                  {
                    title: 'Attitude',
                    expand: false,
                    intro: 'Attitude is vital and can influence every aspect of your life. Is your glass half full or half empty?',
                    description: 'Are you a positive person who notices all the good things that happen and comes up with solutions when things don’t go as planned or do you always expect the worse and the worse always seems to happen?',
                    number: 0
                  }
                ];
                this.currentAssessment.date = moment().format('YYYY-MM-DD');
                this.currentAssessment.appUserId = sessionStorage.getItem('userId');
                //Sets default
                this.areas.forEach(x => this.currentAssessment.data[x.title] = 0);
              }

              
              
            
              ionViewWillLoad() {
                this.storage.get('chartData').then((val) => {
                  this.date = val ? val.Date : '';
                  // console.log('this.date:', this.date, 'val.Date:', val.Date)
                }).then(() => this.lastDate())
              }
            
              toggleSection(area) {
                console.log(area);
                if (area.expand) {
                  area.expand = false;
                } else {
                  area.expand = true;
                }
              }
            
              changeData(categoryIndex, score) {
                this.currentAssessment.data[categoryIndex] = score;
              }

              toSubmit() {
                this.chartProvider.addAssessment(this.currentAssessment)
                  .subscribe(res => {
                    console.log(res);
                    this.navCtrl.setRoot(ResourcesPage);
                  }, err => {
                    console.log(err);
                    alert('Assessment was not submitted. Please resubmit assessment.')
                  })
              }
            
              lastDate() {
                let toast = this.toastCtrl.create({
                  message: `Your last assessment was ${this.date}`,
                  duration: 2500,
                  position: 'middle'
                });
            
                toast.present();
              }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad SelfAssessmentPage');
  // }

}