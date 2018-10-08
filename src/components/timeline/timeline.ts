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
      children: [
        {
          title: 'Understanding the process of separating',
          children: [
            {
              title: 'Meet with separation counselor',
              checkmark: true,
              children: []
            },
            {
              title: 'Take career test',
              checkmark: true,
              children: []
            }
          ]
        },
        {
          title: 'Completing my paperwork',
          children: [
            {
              title: 'Fill out specific paperwork',
              checkmark: true,
              children: []
            }
          ]
        },
        {
          title: 'Engaging VA to access benefits',
          children: [
            {
              title: 'Find out what benefits I will have after separation',
              checkmark: true,
              children: []
            }
          ]
        }
      ],
      itemExpand: false
    },
    {
      title: 'Starting Up',
      children: [
        {
          title: 'Find something to do',
          children: [
            {
              title: 'Go to Career Center',
              checkmark: true,
              children: []
            },
            {
              title: 'Vocational Rehab & Employment',
              checkmark: true,
              children: []
            }
          ]
        },
        {
          title: 'Re-establishing and creating relationships',
          children: [
            {
              title: 'Check out vet center',
              checkmark: true,
              children: []
            }
          ]
        },
        {
          title: 'Balancing finances',
          children: [
            {
              title: 'Open a savings account',
              checkmark: true,
              children: []
            }
          ]
        }
      ],
      itemExpand: false
    },
    {
      title: 'Taking care of myself',
      children: [],
      itemExpand: false
    },
    {
      title: 'Reinventing myself',
      children: [],
      itemExpand: false
    },
    {
      title: 'Putting down roots',
      children: [],
      itemExpand: false
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
