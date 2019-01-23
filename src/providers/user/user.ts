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
  userCreds = {
    token : '',
    userId: ''
  };


  constructor(public http: HttpClient, private storage: StorageProvider) {
    console.log('Hello UserProvider Provider');
  }
  sendReg(user) {
    console.log('sendReg() runs', user, this.requestUrl)
    return this.http.post(this.requestUrl + '/appUsers', user)
  }

  //update data from wizard page and patch user model
  updateUserModel(data: any, id) {
    console.log(data, "#1-updateUserModel")
    return this.http.patch(this.requestUrl + '/appUsers/' + id + '?access_token=' + this.userCreds.token , data)
  }

  getCredentials(resData){
    window.sessionStorage.setItem( "token", resData.token);
    window.sessionStorage.setItem( "userId", resData.userId);
    this.userCreds.token = resData.token;
    this.userCreds.userId = resData.userId;
  }

  login(creds) {
    return this.http.post(this.requestUrl + 'appUsers/login', creds);
  }

  logoutUser() {
    // console.log('onservice-logout')
    console.log(this.userCreds.token);
    // window.sessionStorage.clear();
    return this.http.post(this.requestUrl + "appUsers/logout?access_token=" + this.userCreds.token, {});
  }

  getUser(id) {
    return this.http.get(this.requestUrl + 'appUsers/' + id + '?access_token=' + this.userCreds.token);
  }

  getUserChart(id) {
    return this.http.get(this.requestUrl + 'appUsers/' + id + '/charts?access_token=' + this.userCreds.token);
  }

}

