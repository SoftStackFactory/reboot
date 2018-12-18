import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { NetworkProvider, ConnectionStatusEnum } from '../../providers/network/network';
import { ENV } from '@app/env';


/** Pass untouched request through to the next request handler. */
@Injectable()
export class OfflineInterceptor implements HttpInterceptor {

  constructor(private _network: NetworkProvider){}


  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      console.log(req);
      if (req.url === 'https://api.rss2json.com/v1/api.json') return next.handle(req);
      if(this._network.previousStatus == ConnectionStatusEnum.Offline || ENV.mode === 'demo') return Observable.empty();
      return Observable.empty()
  }
}