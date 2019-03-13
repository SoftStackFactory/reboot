import { Component } from '@angular/core';

/**
 * Generated class for the MeterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'meter',
  templateUrl: 'meter.html'
})
export class MeterComponent {

  text: string;

  constructor() {
    console.log('Hello MeterComponent Component');
    this.text = 'Hello World';
  }

}
