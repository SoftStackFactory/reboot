import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Subscription } from 'rxjs';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the NetworkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NetworkProvider {

  disconnectSubscription : Subscription;
  connectSubscription : Subscription;
  isConnected: boolean = false;

  constructor(private network: Network, private toastCtrl: ToastController) {
    this.onNetworkConnect();
    this.watchDisconnect();
  }

  isNetworkConnection(){
    return this.isConnected;
  }


  // watch network for a disconnection
  watchDisconnect(){
    this.disconnectSubscription = this.network.onDisconnect()
      .subscribe(() => {
        this.isConnected = false;
        console.log('network was disconnected :-(');
        this.presentToast("No Network Connection Detected");
      });
  }

  // stop disconnect watch
  endDisconnectSubscription(){
    this.disconnectSubscription.unsubscribe();
  }
  
  // watch network for a connection
  onNetworkConnect(){
    this.connectSubscription = this.network.onConnect()
      .subscribe(() => {
        this.isConnected = true;
        // We just got a connection but we need to wait briefly
         // before we determine the connection type. Might need to wait.
        // prior to doing any api requests as well.
        this.presentToast("Network is connected");
        setTimeout(() => {
          if (this.network.type === 'wifi') {
            console.log('we got  wifi connection, woohoo!');
          }
        }, 3000);
      });
}  
  
  // stop connect watch
  endConnectSubscript(){
    this.connectSubscription.unsubscribe()
  }

  presentToast( message: string, time: number = 3000) :void {
    
    let toast = this.toastCtrl.create({
      message: message,
      duration:  time,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }



}