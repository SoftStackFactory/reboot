
import { Injectable } from '@angular/core';

/*
  Generated class for the ActionItemProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ActionItemProvider {
  
  currentItem;

  constructor() {
    console.log('Hello ActionItemProvider Provider');
    this.currentItem = "Find out your separation date"
  }

}
