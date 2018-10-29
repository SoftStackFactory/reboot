import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import  {  ENV  }  from  '@app/env';

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
    console.log('sendReg() runs', user)
    return this.http.post(this.requestUrl + '/appUsers', user)
  }


  login(creds) {
    return this.http.post(this.requestUrl + '/appUsers/login', creds);
  }

  logoutUser(token:any) {
    console.log('onservice-logout')
    return this.http.post(this.requestUrl + "/appUsers/logout", token )
  }
}
