import { Component, Input } from '@angular/core';

/**
 * Generated class for the TimelineComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'timeline',
  templateUrl: 'timeline.html'
})
export class TimelineComponent {

  text: string;

  public list = [
    {
      title: 'Getting Out',
      checkmark: false,
      itemExpand: false,
      dot: true,
      children: [
        {
          title: 'Understanding the process of separating',
          dot: true,
          checkmark: false,
          children: [
            {
              title: 'Find out your separation date',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'Complete Pre-Separation Counseling',
              checkmark: true,
              completed: false,
              children: []
            }
          ]
        },
        {
          title: 'Completing my paperwork',
          dot: true,
          checkmark: false,
          children: [
            {
              title: 'Prepare a criterion-based Individual Transition Plan (ITP)',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'Complete a Continuum of Military Service Opportunity Counseling (Required Active Component Only)',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'Evaluate transferability of military skills to civilian workforce',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'Complete DoD Standardized Gap Analysis',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'Document requirements and eligibility for licensure, certification, and apprenticeship',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'Complete an assessment tool to identify personal interests and leanings regarding career selection',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'Complete a job application package or receive a job offer letter',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'Receive a DOL Gold Card and understand post 9/11 Veterans have priority at DOL American Job Centers',
              checkmark: true,
              completed: false,
              children: []
            }
          ]
        },
        {
          title: 'Engaging VA to access benefits',
          checkmark: false,
          dot: true,
          children: [
            {
              title: 'Complete the Veteran Affairs (VA) Benefits Briefings I and II',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'Register on eBenefits',
              checkmark: true,
              completed: false,
              children: []
            }
          ]
        }
      ]
    },
    {
      title: 'Starting Up',
      checkmark: false,
      itemExpand: false,
      dot: true,
      children: [
        {
          title: 'Find something to do',
          dot: true,
          children: [
            {
              title: 'Go to Career Center',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'Vocational Rehab & Employment',
              checkmark: true,
              completed: false,
              children: []
            }
          ]
        },
        {
          title: 'Re-establishing and creating relationships',
          dot: true,
          checkmark: false,
          children: [
            {
              title: 'Check out vet center',
              checkmark: true,
              completed: false,
              children: []
            }
          ]
        },
        {
          title: 'Balancing finances',
          dot: true,
          checkmark: false,
          children: [
            {
              title: 'Open a savings account',
              checkmark: true,
              completed: false,
              children: []
            }
          ]
        }
      ]
    },
    {
      title: 'Taking care of myself',
      checkmark: false,
      children: [],
      itemExpand: false,
      dot: true
    },
    {
      title: 'Reinventing myself',
      checkmark: false,
      itemExpand: false,
      dot: true,
      children: []
    },
    {
      title: 'Putting down roots',
      checkmark: false,
      itemExpand: false,
      dot: true,
      children: []
    }
  ];

  @Input('endIcon') endIcon = "ionic";

  constructor() {
    console.log('Hello TimelineComponent Component');
    this.text = 'Hello World';
  }
  
  toggleItem(item){
    if(item.itemExpand){
      item.itemExpand = false;
    } else {
      item.itemExpand = true;
    }
  }
}

@Component({
  selector: 'timeline-item',
  template: '<ng-content></ng-content>'
})
export class TimelineItemComponent {
  constructor(){

  }
}

@Component({
  selector: 'timeline-time',
  template: '<span>{{time.subtitle}}</span><span>{{time.title}}</span>'
})
export class TimelineTimeComponent {
  constructor(){

  }
}
