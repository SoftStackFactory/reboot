import { Component } from '@angular/core';
import { NavController, NavParams, Slides, Content } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { TimelineProvider } from '../../providers/timeline/timeline';

@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
})
export class TimelinePage {
  @ViewChild('slides') slides: Slides;
  // @ViewChild(Content) content: Content;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public timelineProvider: TimelineProvider) {}

  ionViewDidLoad() {
    this.slides.lockSwipes(true);
    this.initsubgoalCheck()
  }

public goals:any = [
  { 
    goalName: 'Getting Out',
    subGoal: [
      {
        subGoalName: 'Understanding the process of separating',
        toggle: false,
        subgoalId: 'id00',
        complete: false,
        steps: [
          {
            stepId: 'id000',
            step: 'Find out your separation date'
          },
          {
            stepId:'id001',
            step: 'Complete Pre-Separation Counseling'
          }
        ]
      },
      {
        subGoalName: 'Completing my paperwork',
        toggle: false,
        subgoalId: 'id01',
        complete: false,
        steps: [
          {
            stepId:'id010',
            step: 'Prepare a criterion-based Individual Transition Plan (ITP)'
          },
          {
            stepId:'id011',
            step: 'Complete a Continuum of Military Service Opportunity Counseling (Required Active Component Only)'
          },
          {
            stepId:'id012',
            step: 'Evaluate transferability of military skills to civilian workforce'
          },
          {
            stepId:'id013',
            step: 'Complete DoD Standardized Gap Analysis'
          },
          {
            stepId:'id014',
            step: 'Document requirements and eligibility for licensure, certification, and apprenticeship'
          },
          {
            stepId:'id015',
            step: 'Complete an assessment tool to identify personal interests and leanings regarding career selection'
          },
          {
            stepId:'id016',
            step: 'Complete a job application package or receive a job offer letter'
          },
          {
            stepId:'id017',
            step: 'Receive a DOL Gold Card and understand post 9/11 Veterans have priority at DOL American Job Centers'
          }
        ]
      },
      {
        subGoalName: 'Engaging VA to access benefits',
        toggle: false,
        subgoalId: 'id02',
        complete: false,
        steps: [
          {
            stepId:'id020',
            step: 'Complete the Veteran Affairs (VA) Benefits Briefings I and II'
          },
          {
            stepId:'id021',
            step: 'Register on eBenefits'
          }
        ]
      },
    ]
  },
  { 
    goalName: 'Starting Up',
    subGoal: [
      {
        subGoalName: 'Re-establishing and creating relationships',
        toggle: false,
        subgoalId: 'id10',
        complete: false,
        
        steps: [
          {
            stepId:'id100',
            step: 'Check out vet center'
          }
        ]
      },
      {
        subGoalName: 'Balancing finances',
        toggle: false,
        subgoalId: 'id11',
        complete: false,
        steps: [
          {
            stepId:'id110',
            step: 'Open a savings account'
          }
        ]
      },
    ]
  },
  { 
    goalName: 'Self Care',
    subGoal: [
      {
        subGoalName: 'Recognizing and addressing mental health needs',
        toggle: false,
        subgoalId: 'id20',
        complete: false,
        steps: [
          {
            stepId:'id200',
            step: 'Mental Health Care'
          },
          {
            stepId:'id201',
            step: 'PTS services'
          },
          {
            stepId:'id202',
            step: 'Psychological rehabilitation & recovery services'
          },
          {
            stepId:'id203',
            step: 'Veteran Crisis Line'
          },
          {
            stepId:'id204',
            step: 'MST counseling'
          },
          {
            stepId:'id205',
            step: 'Social work'
          }
        ]
      },
      {
        subGoalName: 'VA Health Care',
        toggle: false,
        subgoalId: 'id21',
        complete: false,
        steps: [
          {
            stepId:'id210',
            step: 'Managing primary care'
          },
          {
            stepId:'id211',
            step: 'Preventative care'
          },
          {
            stepId:'id212',
            step: 'Chronic health issues'
          },
          {
            stepId:'id213',
            step: 'Prescription services'
          }
        ]
      },
      {
        subGoalName: 'Seeking support for acute health event',
        toggle: false,
        subgoalId: 'id22',
        complete: false,
        steps: [
          {
            stepId:'id220',
            step: 'Emergency Care'
          },
          {
            stepId:'id221',
            step: 'Specialized Care'
          },
          {
            stepId:'id222',
            step: 'Pharmacy'
          }
        ]
      },
    ]
  },
  { 
    goalName: 'Reinventing Myself',
    subGoal: [
      {
        subGoalName: 'Acquiring the appropriate education, new skills, and credentials',
        toggle: false,
        subgoalId: 'id30',
        complete: false,
        steps: [
          {
            stepId:'id300',
            step: 'Skills Translater - translating my military skills'
          },
          {
            stepId:'id301',
            step: 'Career Center'
          },
          {
            stepId:'id302',
            step: 'Resume builder services'
          },
          {
            stepId:'id303',
            step: 'GI Bill'
          },
          {
            stepId:'id304',
            step: 'Vocational Rehab, Education & Employment Counseling'
          },
          {
            stepId:'id305',
            step: 'Build my professional network'
          }
        ]
      },
      {
        subGoalName: 'Finding the right job',
        toggle: false,
        subgoalId: 'id31',
        complete: false,
        steps: [
          {
            stepId:'id310',
            step: 'Veterans Job Bank'
          },
          {
            stepId:'id311',
            step: 'VA employment'
          },
          {
            stepId:'id312',
            step: 'Building my professional reputation'
          }
        ]
      }
    ]
  },
  { 
    goalName: 'Settling Down',
    subGoal: [
      {
        subGoalName: 'Maintaining my financial, social, and emotional health',
        toggle: false,
        subgoalId: 'id40',
        complete: false,
        steps: [
          {
            stepId:'id400',
            step: 'VA Mental Health Center'
          },
          {
            stepId:'id401',
            step: "Veteran's pension"
          },
          {
            stepId:'id402',
            step: 'Disability compensation'
          },
          {
            stepId:'id403',
            step: 'Engaging VA to access benefits and services'
          }
        ]
      },
      {
        subGoalName: 'Starting, growing, or taking care of my family',
        toggle: false,
        subgoalId: 'id41',
        complete: false,
        steps: [
          {
            stepId:'id410',
            step: 'Revisit Housing'
          },
          {
            stepId:'id411',
            step: 'VA Home Loan/Refinancing'
          },
          {
            stepId:'id412',
            step: 'Planning and saving for my retirement'
          },
          {
            stepId:'id413',
            step: 'Life Insurance'
          }
        ]
      },
      {
        subGoalName: 'Connecting with, and serving my community',
        toggle: false,
        subgoalId: 'id42',
        complete: false,
        steps: [
          {
            stepId:'id420',
            step: 'myVA Communities'
          },
          {
            stepId:'id421',
            step: "VSO's"
          }
        ]
      },
    ]
  }
]

  subGoalToggle(i, x) {
    if(this.goals[i].subGoal[x].toggle) {
      this.goals[i].subGoal[x].toggle = false
    } else {
      this.goals[i].subGoal[x].toggle = true
    }
  }

  slide(x) {
    this.slides.lockSwipes(false);
    this.slides.slideTo(x);
    this.slides.lockSwipes(true);
    this.scrollTo(x);
  }

  updateProgress() {
    this.timelineProvider.updateTimeline(this.timelineProvider.checkbox)
  }

  initsubgoalCheck() {
    for(let a=0; a<this.goals.length; a++) {
      for(let b=0; b<this.goals[a].subGoal.length; b++) {
        let id = this.goals[a].subGoal[b].subgoalId

        if(id in this.timelineProvider.checkbox) {
          this.goals[a].subGoal[b].complete = true
        }
      }
    }
  }

  subgoalCheck(i,x,j) {
    let subgoalId = 'id' + i + x
    let stepId = 'id' + i + x + j

    if(this.timelineProvider.checkbox[stepId] == false) {
      delete this.timelineProvider.checkbox[stepId]
    }
  
    for(let e=0; e<this.goals[i].subGoal[x].steps.length; e++) {
      let id = this.goals[i].subGoal[x].steps[e].stepId

      if(id in this.timelineProvider.checkbox && this.timelineProvider.checkbox[id] == true) {
        this.goals[i].subGoal[x].complete = true
        this.timelineProvider.checkbox[subgoalId] = true
      } else {
        this.goals[i].subGoal[x].complete = false
        delete this.timelineProvider.checkbox[subgoalId]
        break
      }
    }
  }

  scrollTo(x) {
    var elmnt = document.getElementById('seg' + x);
    elmnt.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
  }

}