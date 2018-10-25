import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ChartProvider {

  data: any = [0, 0, 0, 0, 0, 0, 0, 0]

  constructor(public http: HttpClient) {
    console.log('Hello ChartProvider Provider');
  }

  getHistory() {
    return this.http.get('https://reboot-ssf.herokuapp.com/api/appUsers/5bce484f8e47330014efe009/charts')
  }
}
