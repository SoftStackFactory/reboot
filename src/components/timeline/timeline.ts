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
              children: []
            },
            {
              title: 'Take career test',
              children: []
            }
          ]
        },
        {
          title: 'Completing my paperwork',
          children: [
            {
              title: 'Fill out specific paperwork',
              children: []
            }
          ]
        },
        {
          title: 'Engaging VA to access benefits',
          children: [
            {
              title: 'Find out what benefits I will have after separation',
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
              children: []
            },
            {
              title: 'Vocational Rehab & Employment',
              children: []
            }
          ]
        },
        {
          title: 'Re-establishing and creating relationships',
          children: [
            {
              title: 'Check out vet center',
              children: []
            }
          ]
        },
        {
          title: 'Balancing finances',
          children: [
            {
              title: 'Open a savings account',
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
