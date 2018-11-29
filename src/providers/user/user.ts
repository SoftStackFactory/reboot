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
    let token = window.sessionStorage.getItem('token');
    console.log(data, "#1-updateUserModel") 
    return this.http.patch(this.requestUrl + '/appUsers/' + id + '?access_token=' + token , data)
  }


  login(creds) {
    return this.http.post(this.requestUrl + '/appUsers/login', creds);
  }

  logoutUser(token:any) {
    console.log('onservice-logout')
    return this.http.post(this.requestUrl + "/appUsers/logout", token )
  }
  
  getUser(id) {
    let token = window.sessionStorage.getItem('token');
    return this.http.get(this.requestUrl + '/appUsers/' + id + '?access_token=' + token)
  }

}
