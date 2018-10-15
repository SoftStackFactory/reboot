import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  regUrl: string = "https://j-reboot-backend.herokuapp.com/api/appUsers"

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

  sendReg(user) {
    console.log('sendReg() runs', user)
    return this.http.post(this.regUrl, user)
  }


  login(creds) {
    return this.http.post('https://reboot-ssf.herokuapp.com/api/appUsers/login', creds);
  }
}
