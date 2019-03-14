import { Component } from '@angular/core';
import { UserProvider } from '../../providers/user/user';


/**
 * Generated class for the MeterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'meterComp',
  templateUrl: 'meterComp.html'
})
export class MeterCompComponent {

  text: string;

  constructor(public user: UserProvider,) {
   
  }

}
