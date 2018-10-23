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
      children: [
        {
          title: 'Understanding the process of separating',
          checkmark: false,
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
          checkmark: false,
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
          checkmark: false,
          children: [
            {
              title: 'Find out what benefits I will have after separation',
              checkmark: true,
              children: []
            }
          ]
        }
      ],
      itemExpand: false,
      dot: true
    },
    {
      title: 'Starting Up',
      checkmark: false,
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
          checkmark: false,
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
          checkmark: false,
          children: [
            {
              title: 'Open a savings account',
              checkmark: true,
              children: []
            }
          ]
        }
      ],
      itemExpand: false,
      dot: true
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
      children: [],
      itemExpand: false,
      dot: true
    },
    {
      title: 'Putting down roots',
      checkmark: false,
      children: [],
      itemExpand: false,
      dot: true
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
