import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENV } from '@app/env';
import { ToastController } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';


@Injectable()
export class DemoInterceptor implements HttpInterceptor {

  defaultUser: any = {
    firstName: "Peter",
    lastName: "Horton",
    militaryBranch: "Army",
    veteranOrActive: "Veteran",
    separationDate: "2018-11-29",
    disabilityStatus: "No Disability",
    disabilityPercentage: "",
    employmentStatus: "Unemployed",
    lastEmployed: "2018-11",
    maritalStatus: "Single",
    militaryRank: "TET",
    officerRank: "O1",
    enlistingPay: "",
    codeIdentifier: "112",
    userId: 1,
    id: 1,
  }

  charts = [];

  constructor(private toastCtrl: ToastController, private storage: StorageProvider){}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      if (req.url === 'https://api.rss2json.com/v1/api.json') return next.handle(req);

     // Select mode for interceptor to run
      if (ENV.mode === 'Demo') {
        let data;
        if (req.method === 'POST') {
          if(req.url.includes('appUsers/login')) {
            data = this.defaultUser;
            // this.storage.retrieveFromLocalStorage('user').then((val:any)=> {
            //   data = val? {...val, id: 1, userId: 1}: this.defaultUser
            //   return this.createNewRequest(req, data, next);
            // })
          } else if (req.url.includes('appUsers/logout')) {
            this.storage.deleteFromLocalStorage('user');
          } else if (req.url.includes('appUsers')) {
            this.storage.saveToLocalStorage('user', req.body)
            data = req.body;
          } else {
            this.storage.addToItem('assesment', req.body)
            data = req.body;
            this.charts.push(req.body);
          }
        } else if (req.method === 'GET') {
          if (req.url.includes('/charts')) {
            // data = this.storage.retrieveFromLocalStorage('assesment')
            data = this.charts
          } else {
            data = this.defaultUser;
          } 
        } else {
            this.defaultUser = {...this.defaultUser, ...req.body}
            data = this.defaultUser
          // this.storage.retrieveFromLocalStorage('user').then((val: any) => {
          //   data = val? {...val, ...req.body} : {...this.defaultUser, ...req.body}
          //   this.storage.saveToLocalStorage('user', data);
          // })
        }
        return this.createNewRequest(req, data, next)
      } else {
        return next.handle(req);
      }
      
  }


  createNewRequest(req, data, next) {
    req = req.clone({url: window.location.toString(), method: 'HEAD'})
    return next.handle(req).map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        return event.clone({
          body: data,
        })
      }
      return event
    })
  }

}