import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { fromPromise } from 'rxjs/observable/fromPromise';


@Injectable()
export class StorageProvider {

  constructor(private storage: Storage) {
  }

  saveToLocalStorage(key, value) {
    this.storage.set(key, value)
  }

  retrieveFromLocalStorage(key) {
    this.storage.get(key).then((val) => {
      console.log(val)
    })
  }

  addToItem(key, value): any {
    return fromPromise(this.storage.get(key)
      .then((val) => {
        if(val) {
          console.log(val)
          value = val.concat([value])
          // this.storage.set(key, value)
        }
          this.storage.set(key, [value])
      }))
  }

}
