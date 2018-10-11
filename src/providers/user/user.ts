import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import  { ENV }  from  '@app /env';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  requestUrl: string = ENV.url

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

  sendReg(user) {
    console.log('sendReg() runs')
    return this.http.post(this.requestUrl, user)
  }


  login(creds) {
    return this.http.post(this.requestUrl + '/login', creds);
  }
}
