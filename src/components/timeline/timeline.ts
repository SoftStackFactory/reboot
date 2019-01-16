import { Component, Input } from '@angular/core';
// import { Item } from 'ionic-angular';
// import { checkAndUpdateBinding } from '@angular/core/src/view/util';
// import { ActionItemProvider } from '../../providers/action-item/action-item'

interface IGrandChild {
  title: string,
  checkmark: boolean,
  completed: boolean,
  children?: any[]
}

interface IChild {
  title: string,
  checkmark: boolean,
  children: IGrandChild[]
}

interface IParent {
  title: string,
  checkmark: boolean,
  itemExpand: boolean,
  dot: boolean,
  topLevel: boolean,
  areAllStepsCompleted: boolean,
  children: IChild[]
}


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
  actionItem;

  constructor() {
    console.log('Hello TimelineComponent Component');
    this.actionItem = this.list[0].children[0].children[0].title;
  }

  // Event function to update completion status of grandchild
  private updateCompleted(item: IGrandChild) {
    if (item.completed === false){
        item.completed = true;
    } else {
      item.completed = false;
    }
  }
    // Returns boolean value of granchild to child-level (one false g-child returns overall false value),returns child boolean value
    // to parent (one false child returns overall false value), changes parent's "areAllStepsCompleted" value to true for ngClass/styling
    // by checking boolean values of children.
  private trackProgress() {
    this.list.forEach((parentStep: IParent): any => {
      parentStep.areAllStepsCompleted = parentStep.children.every((childStep: IChild): boolean => {
        return childStep.children.every((grandChildStep: IGrandChild): boolean => {
          return grandChildStep.completed === true;
        });
      });
    });
  }

  public list: IParent[] = [
    {
      title: 'Getting Out',
      checkmark: false,
      itemExpand: false,
      dot: true,
      topLevel: true,
      areAllStepsCompleted: false,
      children: [
        {
          title: 'Understanding the process of separating',
          checkmark: false,
          children: [
            {
              title: 'Find out your separation date',
              checkmark: true,
              completed: true,
              children: []
            },
            {
              title: 'Complete Pre-Separation Counseling',
              checkmark: true,
              completed: true,
              children: []
            }
          ]
        },
        {
          title: 'Completing my paperwork',
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
      topLevel: true,
      itemExpand: false,
      dot: true,
      areAllStepsCompleted: false,
      children: [
        {
          title: 'Find something to do',
          checkmark: false,
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
      itemExpand: false,
      topLevel: true,
      dot: true,
      areAllStepsCompleted: false,
      children: [
        {
          title: 'Recognizing and addressing mental health needs',
          checkmark: false,
          children: [
            {
              title: 'Mental Health Care',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'PTS services',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'Psychological rehabilitation & recovery services',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'Veteran Crisis Line',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'MST counseling',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'Social work',
              checkmark: true,
              completed: false,
              children: []
            }
          ]
        },
        {
          title: 'VA Health Care',
          checkmark: false,
          children: [
            {
              title: 'Managing primary care',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'Preventative care',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'Chronic health issues',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'Prescription services',
              checkmark: true,
              completed: false,
              children: []
            }
          ]
        },
        {
          title: 'Seeking support for acute health event',
          checkmark: false,
          children: [
            {
              title: 'Emergency Care',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'Specialized Care',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'Pharmacy',
              checkmark: true,
              completed: false,
              children: []
            }
          ]
        }
      ]
    },
    {
      title: 'Reinventing myself',
      checkmark: false,
      itemExpand: false,
      dot: true,
      topLevel: true,
      areAllStepsCompleted: false,
      children: [
        {
          title: 'Acquiring the appropriate education, new skills, and credentials',
          checkmark: false,
          children: [
            {
              title: 'Skills Translater - translating my military skills',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'Career Center',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'Resume builder services',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'GI Bill',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'Vocational Rehab, Education & Employment Counseling',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'Build my professional network',
              checkmark: true,
              completed: false,
              children: []
            }
          ]
        },
        {
          title: 'Finding the right job',
          checkmark: false,
          children: [
            {
              title: 'Veterans Job Bank',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'VA employment',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'Building my professional reputation',
              checkmark: true,
              completed: false,
              children: []
            }
          ]
        }
      ]
    },
    {
      title: 'Putting down roots',
      checkmark: false,
      itemExpand: false,
      dot: true,
      topLevel: true,
      areAllStepsCompleted: false,
      children: [
        {
          title: 'Maintaining my financial, social, and emotional health',
          checkmark: false,
          children: [
            {
              title: 'VA Mental Health Center',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: "Veteran's pension",
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'Disability compensation',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'Engaging VA to access benefits and services',
              checkmark: true,
              completed: false,
              children: []
            }
          ]
        },
        {
          title: 'Starting, growing, or taking care of my family',
          checkmark: false,
          children: [
            {
              title: 'Revisit Housing',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'VA Home Loan/Refinancing',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'Planning and saving for my retirement',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'Life Insurance',
              checkmark: true,
              completed: false,
              children: []
            }
          ]
        },
        {
          title: 'Connecting with, and serving my community',
          checkmark: false,
          children: [
            {
              title: 'myVA Communities',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: "VSO's",
              checkmark: true,
              completed: false,
              children: []
            }
          ]
        }
      ]
    },
    {
      title: 'Retiring',
      checkmark: false,
      itemExpand: false,
      dot: true,
      topLevel: true,
      areAllStepsCompleted: false,
      children: [
        {
          title: 'Taking care of my own heath',
          checkmark: false,
          children: [
            {
              title: 'VA Health Center',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: "Audiology",
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'Blind & Vision Rehab',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'Specialized care',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: "Participating in meaningful activities",
              checkmark: true,
              completed: false,
              children: []
            }
          ]
        },
        {
          title: 'Finding additional sources of income',
          checkmark: false,
          children: [
            {
              title: "VA Veteran's Pension",
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: "Disability Compensation",
              checkmark: true,
              completed: false,
              children: []
            }
          ]
        }
      ]
    },
    {
      title: 'Aging',
      checkmark: false,
      itemExpand: false,
      dot: true,
      topLevel: true,
      areAllStepsCompleted: false,
      children: [
        {
          title: 'Managing my declining heath',
          checkmark: false,
          children: [
            {
              title: 'Planning for longer term care',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'Holistic end of the planning',
              checkmark: true,
              completed: false,
              children: []
            }
          ]
        },
        {
          title: 'Adapting my support network to my new needs',
          checkmark: false,
          children: [
            {
              title: 'Home health care',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'Geriatric & extended health',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: 'Caregiver services',
              checkmark: true,
              completed: false,
              children: []
            }
          ]
        }
      ]
    },
    {
      title: 'Dying',
      checkmark: false,
      itemExpand: false,
      dot: true,
      topLevel: true,
      areAllStepsCompleted: false,
      children: [
        {
          title: 'Deciding how and where to be memorialized',
          checkmark: false,
          children: [
            {
              title: 'Burial benefits/allowances',
              checkmark: true,
              completed: false,
              children: []
            },
            {
              title: "Survivor's benefits, grief counseling",
              checkmark: true,
              completed: false,
              children: []
            }
          ]
        }
      ]
    }
  ];

  @Input('endIcon') endIcon = "ionic";


  toggleItem(item){
    if(item.itemExpand){
      item.itemExpand = false;
    } else {
      item.itemExpand = true;
    }
  }
  
  // actionItem() {
  
    // console.log(firstItem);

    // for(let i = 0; i < this.list.length; i++) {
    //   for(let i = 0; i < )
    // }
  // }
  
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
