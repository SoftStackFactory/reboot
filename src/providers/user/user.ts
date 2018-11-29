import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/* Commenting out for demo
import  {  ENV  }  from  '@app/env';
End of comment for demo */

/* 
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  /* commenting out for demo
  requestUrl: string = ENV.url
  end of commenting for demo */
  
  userName: any = "Maurice";

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

  // sendReg(user) {
  //   console.log('sendReg() runs', user)
  //   return this.http.post(this.requestUrl + '/appUsers', user)
  // }
  //update data from wizard page and patch user model
  // updateUserModel(data: any, id) {
  //   console.log(data, "#1-updateUserModel") 
  //   return this.http.patch(this.requestUrl + '/appUsers/' + id , data)
  // }

  // login(creds) {
  //   return this.http.post(this.requestUrl + '/appUsers/login', creds);
  // }

  // logoutUser(token:any) {
  //   console.log('onservice-logout')
  //   return this.http.post(this.requestUrl + "/appUsers/logout", token )
  // }
  
  // getUser(id) {
  //   return this.http.get(this.requestUrl + '/appUsers/' + id)

  // }
}

