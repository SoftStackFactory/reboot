import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { ToastController } from 'ionic-angular';
import * as moment from 'moment';
import { Observable } from 'rxjs';


const STORAGE_REQ_KEY = 'cachedReq';

@Injectable()
export class StorageProvider {

  constructor(private storage: Storage, private toastCtrl: ToastController) {}


  storeRequest(req) {
    let toast = this.toastCtrl.create({
      message: `Your data is stored locally because you seem to be offline.`,
      duration: 3000,
      position: 'bottom'
    });
    toast.present()
 
    return this.storage.get(STORAGE_REQ_KEY).then(storedOperations => {
      let action = {
        url: req.url,
        data: req.body,
        type: req.method,
        date:  moment().format('MMMM Do YYYY, h:mm:ss a'),
        id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
      }

      let storedObj
      if (storedOperations) {
        storedObj = storedOperations.concat([action])
      } else {
        storedObj = [action];
      }
      return this.storage.set(STORAGE_REQ_KEY, storedObj)
    });
  }


  saveToLocalStorage(key, value) {
    return this.storage.set(key, value)
  }

  retrieveFromLocalStorage(key) {
    return this.storage.get(key).then((val) => {
    })
  }

  deleteFromLocalStorage (key) {
    return this.storage.remove(key)
  }

  addToItem(key, value): any {
    return fromPromise(this.storage.get(key)
      .then((val) => {
        if(val) {
          value = val.concat([value])
          return this.storage.set(key, value)
        }
          return this.storage.set(key, [value])
      }))
  }

}
