import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { UserProvider } from '../../providers/user/user';
import { App, MenuController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';

@Injectable()
export class TimelineProvider {

  currentDate:any = new Date();
  timelineObj:any 
  instanceId:any
  checkbox:any = {};
  userId:any

  newTimelineObj = {
    "lastModified": this.currentDate,
    "content": {},
    "appUserId": this.userId
  }

  updatedTimelineObj = {
    "lastModified": this.currentDate,
    "content": {},
    "id": "",
    "appUserId": this.userId
  }

  constructor(public http: HttpClient,
              public userProvider: UserProvider, 
              public menuCtrl: MenuController,
              public app: App) {}

  getExisitingTimelineInstance() {
    const creds = this.userProvider.getCredentials()
    return this.http.get(this.userProvider.requestUrl + "appUsers/" + creds.userId + "/timelines?access_token=" + creds.token);
  }

  postNewtimelineInstance() {
    const creds = this.userProvider.getCredentials() 
    return this.http.post(this.userProvider.requestUrl + "timelines?access_token=" + creds.token, this.newTimelineObj);
  }

  updateExisitingTimelineInstace() {
    const creds = this.userProvider.getCredentials() 
    return this.http.put(this.userProvider.requestUrl + "timelines?access_token=" + creds.token, this.updatedTimelineObj);
  }

  getTimeline() {
    this.checkbox = {}
    this.setUserId()
    this.getExisitingTimelineInstance()
    .subscribe(response => {
      this.timelineObj = response;
      console.log('%c Timeline instance data loaded.', 'background: blue; color: white; display: block;')
      this.updatedTimelineObj.id = this.timelineObj.id
      this.checkbox = this.timelineObj.content;
    },
    error => {
      console.log('%c Timeline instance not found.', 'background: red; color: white; display: block;')
      if(error.status == '404') {
        console.log('%c Error ' + error.status + ' ' + error.statusText +  ' ', 'background: red; color: white; display: block;')
        this.setUserId()
        this.postTimeline()
      } else {
        console.log('%c Error ' + error.status + ' ' + error.statusText +  ' ', 'background: red; color: white; display: block;')
        this.logoutOnError()
      }

    })
  }

  postTimeline() {
    this.postNewtimelineInstance()
    .subscribe(response => {
      console.log('%c New timeline instance created.', 'background: green; color: white; display: block;')
      this.getTimeline()
    })
  }

  updateTimeline(obj) {
    this.currentDate= new Date();
    this.updatedTimelineObj.content = obj
    this.updateExisitingTimelineInstace()
    .subscribe(response => {
      console.log('%c Timeline instance updated.', 'background: green; color: white; display: block;')
    },
    error => {
      console.log('%c Error updating timeline instance.', 'background: red; color: white; display: block;')
      console.log('%c Error ' + error.status + ' ' + error.statusText +  ' ', 'background: red; color: white; display: block;')
    })
  }

  setUserId() {
    this.newTimelineObj.appUserId = window.sessionStorage.getItem("userId")
    this.updatedTimelineObj.appUserId = window.sessionStorage.getItem("userId")
  }

  logoutOnError() {
    this.app.getRootNav().setRoot(LoginPage, {}, {animate: true, direction: "forward"});
    window.sessionStorage.clear()
    this.menuCtrl.enable(false);
    this.menuCtrl.swipeEnable(false); 
  }
  
}
