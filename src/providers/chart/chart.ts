import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ChartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChartProvider {

  data: any = [0, 0, 0, 0, 0, 0, 0, 0]

  constructor(public http: HttpClient) {
    console.log('Hello ChartProvider Provider');
  }

}
