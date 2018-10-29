import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ChartProvider {

  data: any = [0, 0, 0, 0, 0, 0, 0, 0]

  constructor(public http: HttpClient) {
    console.log('Hello ChartProvider Provider', this.data);
  }

}
