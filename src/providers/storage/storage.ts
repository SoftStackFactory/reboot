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
      console.log(val + ' is retrieved')
    })
  }

}
