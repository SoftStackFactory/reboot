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
    console.log('sendReg() runs', user)
    return this.http.post(this.requestUrl + '/appUsers', user)
  }

  //update data from wizard page and patch user model
  updateUserModel(data: any, id) {
    let token = window.sessionStorage.getItem('token');
    console.log(data, "#1-updateUserModel")
    return this.http.patch(this.requestUrl + '/appUsers/' + id + '?access_token=' + token , data)
  }

  getCredentials(){
    let userCredentials: any = {};
    userCredentials.token = sessionStorage.getItem('token');
    userCredentials.userId = sessionStorage.getItem('userId');
    return userCredentials;
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

  getUserChart(id) {
    let token = window.sessionStorage.getItem('token');
    return this.http.get(this.requestUrl + '/appUsers/' + id + '/charts?access_token=' + token)
  }

}

