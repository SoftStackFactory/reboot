import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

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
    this.storage.get(key).then((val) => {
      if(val) {
        console.log(val)
        value = val.concat([value])
        return this.storage.set(key, value)
      }
      console.log('i ran')
      
      return this.storage.set(key, [value])
    }).catch((e) => {
      console.log(e)
    })
  }

}
