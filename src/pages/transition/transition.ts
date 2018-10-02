import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Chart } from 'chart.js';
import 'chartjs-plugin-datalabels';


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

  @ViewChild('canvas') canvas;

  areas: Array<any>;
  chart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.areas = [
      {
        title: 'Career',
        expand: false,
        description: 'How is your career going? We spend a lot of time working so how is it for you? Does it excite you? Have you a clear idea what it is you want to achieve? If you are not working are you happy you know what it is you want to do and are taking steps to achieve this? Are you a 1 – you feel physically sick before you go to work each morning (and not because you have been enjoying the festive season too much) or are you a 10 – would you do your job without being paid for it?',
        number: 0
      },
      {
        title: 'Finances',
        expand: false,
        description: 'This is not about how much you have but rather how you relate to money. There are some millionaires who worry themselves sick about money so might score very low here and others who have just enough to get by and simply go with the flow. A 10 is someone totally at ease with money whereas a 1 is someone so worried about money that it is creating huge stress and limiting them in all their actions.',
        number: 0
      },
      {
        title: 'Personal Growth',
        expand: false,
        description: 'People who are truly successful commit themselves continually to learning and improving themselves. Are you a 10 – committed to learning as much as you can about life? Are you constantly experiencing new opportunities? Do you regularly read to learn and grow? Are you open to improving and stretching yourself? The fact that you are reading this demonstrates a certain level of commitment to develop yourself so you are not a 1 or even a 2.',
        number: 0
      },
      {
        title: 'Health',
        expand: false,
        description: 'We all take our health for granted until it lets us down. How is yours? Do you look after yourself? Are you eating well? Do you get regular exercise? Having a long-term illness does not necessarily mean you need to give yourself a low score. The main thing is whether you are doing everything within your control to improve or regulate your condition.',
        number: 0
      },
      {
        title: 'Family',
        expand: false,
        description: 'Family life is very important. Although family life should be loving, caring and supportive it often is not for a variety of reasons such as crying babies, wild teenage sons or daughters or constant arguments and tension. These all represent a huge challenge and will affect other areas of your life like your work / studies, relationships and so on. In this respect family life to you could mean a single unit or a more extended family. Whatever family life means to you give yourself a current score.',
        number: 0
      },
      {
        title: 'Relationships',
        expand: false,
        description: 'Consider the key relationship you have whether it is with your boyfriend/girlfriend husband/wife/friend or family member. Where do you feel it is at? Where would you like it to be?',
        number: 0
      },
      {
        title: 'Social Life',
        expand: false,
        description: 'This can be about the quality of your social life which can score very low for people with busy careers. However you can also decide to score it based on how you interact with people as how often you get to socialise. A vital component of life is the need to get on and interact with people. How comfortable you are in social situations? Some people are the life and soul of every party, loved by all and fully confident yet sensitive whereas others will not want to speak up when there is a group of people around. Give yourself a score. Remember for this one that most 1s are locked up. so you can rule out that score.',
        number: 0
      },
      {
        title: 'Attitude',
        expand: false,
        description: 'Attitude is vital and can influence every aspect of your life. Is your glass half full or half empty? Are you a positive person who notices all the good things that happen and comes up with solutions when things don’t go as planned or do you always expect the worse and the worse always seems to happen?',
        number: 0
      },
      {
        title: 'Final Step',
        expand: false,
        description: 'When you have scored all areas join the points on each section to draw a wheel. This will show you how balanced overall your life is and what areas you really need to focus on. Put a date on it and review it at least every 6 months.',
        number: 0
      }
    ];


  }

  ionViewDidLoad() {
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'polarArea',
      data: {
        labels: ["Career", "Finance", "Personal \n Growth", "Health", "Family", "Relationships", "Social life", "Attitude"],
        datasets: [
          {
            backgroundColor: ["rgba(0,0,255, .2)", "rgba(255,0,0, .2)", "rgba(128,0,128, .2)", "rgba(0,128,0, .2)", "rgba(255,165,0, .2)", "rgba(0,128,128, .2)", "rgba(255,0,255, .2)", "rgba(0,255,0, .2)"],
            borderColor: "black",
            data: [0, 0, 0, 0, 0, 0, 0, 0]
          }
        ]
      },

      options: {
        layout: {
          padding: {
            top: 55,
            bottom: 55
          }
        },
        legend: {
          display: false
        },
        plugins: {
          datalabels: {
            textAlign: 'center',
            anchor: 'start',
            align: 'end',
            offset: function (context) {
              let chart = context.chart.width;
              return chart / 4.0 - 60;
            },
            backgroundColor: function (context) {
              return context.dataset.backgroundColor;
            },
            borderColor: 'black',
            rotation: function (context) { if (context.dataIndex === 0 || context.dataIndex === 1 || context.dataIndex === 6 || context.dataIndex === 7) { return 45 / 2 + (45 * context.dataIndex) } else { return 45 / 2 + (45 * context.dataIndex) + 180 } },
            borderRadius: 5,
            borderWidth: 200,
            color: 'black',
            font: function (context) {
              var width = context.chart.width;
              var size = Math.round(width / 60);
              return {
                size: size,
                weight: 600,
                font: 'Lato'
              };
            },
            formatter: function (value, context) {
              return context.chart.data.labels[context.dataIndex] + ' ' + context.chart.data.datasets[0].data[context.dataIndex];
            }
          }
        }
      }
    });

    //This code down below is to fix a bug where I could not modify the scale in the options
    //key in the above code (It threw a typescript error even though it worked)
    this.chart.config.options.scale.ticks.beginAtZero = true;
    this.chart.config.options.scale.ticks.min = 0;
    this.chart.config.options.scale.ticks.max = 10;
    this.chart.config.options.scale.ticks.stepSize = 1;
    this.chart.data.datasets.data = [0, 0, 0, 0, 0, 0, 0, 0];
    this.chart.data.datasets.data[0] = 0;
    this.chart.update();
  }

  toggleSection(area) {
    console.log(area);
    if (area.expand) {
      area.expand = false;
    } else {
      area.expand = true;
    }
  }

  changeData(categoryIndex, newNumber) {
    this.chart.data.datasets[0].data[categoryIndex] = newNumber;
    this.chart.update();
  }

}
