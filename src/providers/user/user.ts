import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
  
import { ENV }  from '@app/env';
import { StorageProvider } from '../storage/storage'
    
/*  
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  userData: any = {
    firstName: "",
    lastName: "",
    email: "",

    maritalStatus: "",
    employmentStatus: "",
    lastEmployed: "",

    militaryBranch: "",
    veteranOrActive: "",
    separationDate: "",
    militaryRank: "",
    disabilityStatus: "",
    disabilityPercentage: "",
    officerRank: "",
    enlistingPay: "",
    codeIdentifier: ""
  }

  requestUrl: string = ENV.url
  userName: any = "Maurice";

  constructor(public http: HttpClient, private storage: StorageProvider) {
    console.log('Hello UserProvider Provider');
  }
  sendReg(user) {
    console.log('sendReg() runs', user, this.requestUrl)
    return this.http.post(this.requestUrl + '/appUsers', user)
  }

  //update data from wizard page and patch user model
  updateUserModel(data: any) {
    console.log(data, "#1-updateUserModel")
    return this.http.patch(this.requestUrl + '/appUsers/' + this.getCredentials().userId + '?access_token=' + this.getCredentials().token, data)
  }

  getCredentials() {
    let userCreds: any = {};
    userCreds.token = window.sessionStorage.getItem("token");
    userCreds.userId = window.sessionStorage.getItem("userId");
    return userCreds; 
  }

  setCredentials(resData){
    window.sessionStorage.setItem( "token", resData.token);
    window.sessionStorage.setItem( "userId", resData.userId);
  }

  login(creds) {
    return this.http.post(this.requestUrl + 'appUsers/login', creds);
  }

  logoutUser() {
    // window.sessionStorage.clear();
    return this.http.post(this.requestUrl + "appUsers/logout?access_token=" + this.getCredentials().token, {});
  }

  getUser() {
    return this.http.get(this.requestUrl + 'appUsers/' + this.getCredentials().userId + '?access_token=' + this.getCredentials().token);
  }

  getUserChart() {
    return this.http.get(this.requestUrl + 'appUsers/' + this.getCredentials().userId + '/charts?access_token=' + this.getCredentials().token);
  }

}

