import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
// import { Plotly } from 'plotly.js-dist';

/**
 * Generated class for the TransitionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-transition',
  templateUrl: 'transition.html',
})
export class TransitionPage {
  chart: Chart;

  areas: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.areas = [
      {
        title: 'Finances',
        description: 'This is not about how much you have but rather how you relate to money. There are some millionaires who worry themselves sick about money so might score very low here and others who have just enough to get by and simply go with the flow. A 10 is someone totally at ease with money whereas a 1 is someone so worried about money that it is creating huge stress and limiting them in all their actions.'
      },
      {
        title: 'Personal Growth',
        description: 'People who are truly successful commit themselves continually to learning and improving themselves. Are you a 10 – committed to learning as much as you can about life? Are you constantly experiencing new opportunities? Do you regularly read to learn and grow? Are you open to improving and stretching yourself? The fact that you are reading this demonstrates a certain level of commitment to develop yourself so you are not a 1 or even a 2.'
      },
      {
        title: 'Health',
        description: 'We all take our health for granted until it lets us down. How is yours? Do you look after yourself? Are you eating well? Do you get regular exercise? Having a long-term illness does not necessarily mean you need to give yourself a low score. The main thing is whether you are doing everything within your control to improve or regulate your condition.'
      },
      {
        title: 'Family',
        description: 'Family life is very important. Although family life should be loving, caring and supportive it often is not for a variety of reasons such as crying babies, wild teenage sons or daughters or constant arguments and tension. These all represent a huge challenge and will affect other areas of your life like your work / studies, relationships and so on. In this respect family life to you could mean a single unit or a more extended family. Whatever family life means to you give yourself a current score.'
      },
      {
        title: 'Relationships',
        description: 'Consider the key relationship you have whether it is with your boyfriend/girlfriend husband/wife/friend or family member. Where do you feel it is at? Where would you like it to be?'
      },
      {
        title: 'Social Life',
        description: 'This can be about the quality of your social life which can score very low for people with busy careers. However you can also decide to score it based on how you interact with people as how often you get to socialise. A vital component of life is the need to get on and interact with people. How comfortable you are in social situations? Some people are the life and soul of every party, loved by all and fully confident yet sensitive whereas others will not want to speak up when there is a group of people around. Give yourself a score. Remember for this one that most 1s are locked up. so you can rule out that score.'
      },
      {
        title: 'Attitude',
        description: 'Attitude is vital and can influence every aspect of your life. Is your glass half full or half empty? Are you a positive person who notices all the good things that happen and comes up with solutions when things don’t go as planned or do you always expect the worse and the worse always seems to happen?'
      },
      {
        title: 'Career',
        description: 'How is your career going? We spend a lot of time working so how is it for you? Does it excite you? Have you a clear idea what it is you want to achieve? If you are not working are you happy you know what it is you want to do and are taking steps to achieve this? Are you a 1 – you feel physically sick before you go to work each morning (and not because you have been enjoying the festive season too much) or are you a 10 – would you do your job without being paid for it?'
      }
    ];
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad TransitionPage');

    this.chart = new Chart('canvas', {
      type: 'radar',
      data: {
        labels: ["Career", "Finance", "Personal Growth", "Health", "Family", "relationships", "social life", "attitude"],
        datasets: [
          {
            backgroundColor: "rgba(100,100,220,0.5)",
            borderColor: "rgba(255,255,255,0)",
            data: [2, 2, 0]
          },
          {
            backgroundColor: "rgba(100,200,220,0.5)",
            borderColor: "rgba(255,255,255,1)",
            data: [0, 3, 3, 0]
          },
          {
            backgroundColor: "rgba(255,200,220,1)",
            borderColor: "rgba(255,255,255,1)",
            data: [0, 0, 4, 4, 0]
          },
          {
            backgroundColor: "rgba(205,55,255,1)",
            borderColor: "rgba(255,255,255,1)",
            data: [0, 0, 0, 5, 5, 0]
          },
          {
            backgroundColor: "rgba(50,55,255,1)",
            borderColor: "rgba(255,255,255,1)",
            data: [0, 0, 0, 0, 6, 6, 0]
          },
          {
            backgroundColor: "rgba(50,155,0,1)",
            borderColor: "rgba(255,255,255,1)",
            data: [0, 0, 0, 0, 0, 7, 7, 0]
          },
          {
            backgroundColor: "rgba(200,155,0,0.5)",
            borderColor: "rgba(255,255,255,1)",
            data: [0, 0, 0, 0, 0, 0, 8, 8, 0]
          },
          {
            backgroundColor: "rgba(100,200,50,0.5)",
            borderColor: "rgba(255,255,255,0)",
            data: [0, 0, 0, 0, 0, 0, 0, 10, 10, 0]
          }
        ]
      },

      options: {
        title: {
          display: false,
          text: 'Color test'
        },
         scale: {
    ticks: {
      min: 0,
      max: 10
    }
  },
  legend: {
            display: false
         }
      }
    });
  }
  

}
