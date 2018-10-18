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
        intro: 'How is your career going? We spend a lot of time working so how is it for you? Does it excite you? Have you a clear idea what it is you want to achieve?',
        description: 'If you are not working are you happy you know what it is you want to do and are taking steps to achieve this? Are you a 1 – you feel physically sick before you go to work each morning (and not because you have been enjoying the festive season too much) or are you a 10 – would you do your job without being paid for it?',
        number: 0
      },
      {
        title: 'Finances',
        expand: false,
        intro: 'This is not about how much you have but rather how you relate to money. There are some millionaires who worry themselves sick about money so might score very low here and others who have just enough to get by and simply go with the flow.',
        description: 'A 10 is someone totally at ease with money whereas a 1 is someone so worried about money that it is creating huge stress and limiting them in all their actions.',
        number: 0
      },
      {
        title: 'Personal Growth',
        expand: false,
        intro: 'People who are truly successful commit themselves continually to learning and improving themselves. Are you a 10 – committed to learning as much as you can about life?',
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
        intro: 'Family life is very important. Although family life should be loving, caring and supportive it often is not for a variety of reasons such as crying babies, wild teenage sons or daughters or constant arguments and tension.',
        description: ' These all represent a huge challenge and will affect other areas of your life like your work / studies, relationships and so on. In this respect family life to you could mean a single unit or a more extended family. Whatever family life means to you give yourself a current score.',
        number: 0
      },
      {
        title: 'Relationships',
        expand: false,
        intro: 'Consider the key relationship you have whether it is with your boyfriend/girlfriend husband/wife/friend or family member.',
        description: 'Where do you feel it is at? Where would you like it to be?',
        number: 0
      },
      {
        title: 'Social Life',
        expand: false,
        intro: 'This can be about the quality of your social life which can score very low for people with busy careers. However you can also decide to score it based on how you interact with people as how often you get to socialise. A vital component of life is the need to get on and interact with people.',
        description: 'How comfortable you are in social situations? Some people are the life and soul of every party, loved by all and fully confident yet sensitive whereas others will not want to speak up when there is a group of people around. Give yourself a score. Remember for this one that most 1s are locked up. so you can rule out that score.',
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


  }

/** This block of code is for everything contained in ionViewDidLoad right below it
 *
 Everything above the options property in the chart code relates to the chart data. Everything below that property modifies the display in some way.
 
 Everything below the plugins property in options relates to the snazzy labels that surround the chart.

 The layout.padding property gives room for the snazzy labels.

 In plugins.datalabels:

            anchor, align, and offset are all used to position the labels. the anchor value sets the anchor point from which you'll relate a label's position
            align defines what direction you'll position your labels relative to the anchor point
            offset defines how far away from the anchor point you will position the labels
            For more explanation: https://chartjs-plugin-datalabels.netlify.com/positioning.html

            Some properties have functions as their values. This makes the values dynamic, changing based on certain conditions.
            You'll notice that the functions take an argument called context. This object contains helpful information about the chart. Console log it if you're curious!

            The "rotation" property is what rotates the labels to match where they are around the graph
            The "BorderRadius property " controls how round the edges of the label containers are.
            The "Font" and "Offset" functions scale the font and positioning according to the chart's width.
            The "Formatter" property is what allows us to display the data names and values.
            */

  ionViewDidLoad() {
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'polarArea',
      data: {
        labels: ["Career", "Finance", "Personal \n Growth", "Health", "Family", "Relationships", "Social life", "Attitude"],
        datasets: [
          {
            backgroundColor: ["rgba(0,0,255, .6)", "rgba(255,0,0, .6)", "rgba(128,0,128, .6)", "rgba(0,128,0, .6)", "rgba(255,165,0, .6)", "rgba(0,128,128, .6)", "rgba(255,0,255, .6)", "rgba(0,255,0, .6)"],
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
              let chartWidth = context.chart.width;
              return chartWidth / 4.0 - 60;
            },
            backgroundColor: ["rgba(0,0,255, .2)", "rgba(255,0,0, .2)", "rgba(128,0,128, .2)", "rgba(0,128,0, .2)", "rgba(255,165,0, .2)", "rgba(0,128,128, .2)", "rgba(255,0,255, .2)", "rgba(0,255,0, .2)"],
            borderColor: 'black',
            rotation: function (context) {
              if (context.dataIndex === 0 || context.dataIndex === 1 || context.dataIndex === 6 || context.dataIndex === 7) { return 45 / 2 + (45 * context.dataIndex) }
              else { return 45 / 2 + (45 * context.dataIndex) + 180 }
            },
            borderRadius: 5,
            borderWidth: 0,
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
    this.chart.config.options.scale.ticks.min = 0;
    this.chart.config.options.scale.ticks.max = 10;
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
