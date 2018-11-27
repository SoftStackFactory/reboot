import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import  {  ENV  }  from  '@app/env';

/* 
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  requestUrl: string = ENV.url

  userData: any = {};

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }


  sendReg(user) {
    console.log('sendReg() runs', user)
    return this.http.post(this.requestUrl + '/appUsers', user)
  }
  //update data from wizard page and patch user model
  updateUserModel(data: any, id) {
    console.log(data, "#1-updateUserModel") 
    return this.http.patch(this.requestUrl + '/appUsers/' + id , data)
  }

  login(creds) {
    return this.http.post(this.requestUrl + '/appUsers/login', creds);
  }

  logoutUser(token:any) {
    console.log('onservice-logout')
    return this.http.post(this.requestUrl + "/appUsers/logout", token )
  }
  
  getUser(id) {
    return this.http.get(this.requestUrl + '/appUsers/' + id)
  }
  calcDate() {
    let sepDate = moment(this.userData.separationDate, "YYYY-MM-DD").toDate().getTime();
    let now = new Date().getTime();
    let diff = sepDate - now;
    return Math.ceil(diff/86400000);
  }
}
