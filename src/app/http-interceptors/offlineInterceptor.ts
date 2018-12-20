import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';
import 'rxjs/add/observable/of'
import { NetworkProvider, ConnectionStatusEnum } from '../../providers/network/network';
import { ENV } from '@app/env';
import { StorageProvider } from '../../providers/storage/storage';


/** Pass untouched request through to the next request handler. */
@Injectable()
export class OfflineInterceptor implements HttpInterceptor {

  constructor(private _network: NetworkProvider, private _storage: StorageProvider ){}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      if (req.url === 'https://api.rss2json.com/v1/api.json') return next.handle(req);
      if(this._network.previousStatus == ConnectionStatusEnum.Offline || ENV.mode === 'Development') {
        this._storage.storeRequest(req)
        return Observable.throw(new HttpErrorResponse({error: 'Operating on offline mode'}))
      }
      return next.handle(req)
  }

}