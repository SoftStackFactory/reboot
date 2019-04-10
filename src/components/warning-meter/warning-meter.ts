import { Component } from '@angular/core';
import { UserProvider } from '../../providers/user/user';


@Component({
  selector: 'warning-meter',
  templateUrl: 'warning-meter.html'
})
export class WarningMeterComponent {

  text: string;

  constructor(public user: UserProvider) {
    console.log('Hello WarningMeterComponent Component');
    this.text = 'Hello World';
  }

}
