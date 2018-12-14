import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Subscription } from 'rxjs';
/*
  Generated class for the NetworkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NetworkProvider {

  disconnectSubscription : Subscription

  constructor(private network: Network) { }


  
  // watch network for a disconnection

  watchDisconnect(){
    this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
    });
  }
  // stop disconnect watch
  //disconnectSubscription.unsubscribe();
  
  
  // watch network for a connection
  connectSubscription = this.network.onConnect().subscribe(() => {
    console.log('network connected!');
    // We just got a connection but we need to wait briefly
     // before we determine the connection type. Might need to wait.
    // prior to doing any api requests as well.
    setTimeout(() => {
      if (this.network.type === 'wifi') {
        console.log('we got a wifi connection, woohoo!');
      }
    }, 3000);
  });
  
  // stop connect watch
  endConnectSubscript(){
    this.connectSubscription.unsubscribe()
  }
}