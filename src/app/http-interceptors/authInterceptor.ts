import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { NetworkProvider, ConnectionStatusEnum } from '../../providers/network/network';
import { ENV } from '@app/env';
import { ToastController } from 'ionic-angular';



/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  user: any = {
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
  }

  constructor(private _network: NetworkProvider, private toastCtrl: ToastController, private storage: Storage ){}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      if (window.sessionStorage.getItem('token')) return next.handle(req)
      if (ENV.mode === 'Development') {
        if (req.url.includes('/appUsers/login')) {
          this.storage.setItem('user', this.user) 
          return next.handle(req);
        }
        if (req.url.includes('appUsers') && req.method === 'POST') {
          
        }
      }
      else {
        let toast = this.toastCtrl.create({
          message: "Unable to use offline mode without while logged out",
          duration: 2500,
          position: 'middle'
        })
      }
  }

}