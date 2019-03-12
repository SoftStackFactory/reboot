import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
// import { Subscription } from 'rxjs';
import { AlertController, Events, ToastController, Platform } from 'ionic-angular';
/*
  Generated class for the NetworkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


export enum ConnectionStatusEnum {
  Online,
  Offline
}


@Injectable()
export class NetworkProvider {

  previousStatus;

  constructor(
    public alertCtrl: AlertController, 
    public network: Network,
    public eventCtrl: Events, 
    public toastCtrl: ToastController,
    private plt: Platform,
  ) {

    //this.previousStatus = ConnectionStatusEnum.Online;
    // this.plt.ready()
    //   .then(() => {

    //     this.network.onConnect().subscribe(() => {
    //       console.log('network connected!');
    //       this.toastCtrl.create({
    //         message: 'Network connected',
    //         duration: 2000
    //       }).present();
    //     });
    
    //     this.network.onDisconnect().subscribe(() => {
    //       console.log('network was disconnected :-(');
    //       this.toastCtrl.create({
    //         message: 'Network disconnected',
    //         duration: 2000
    //       }).present();
    //     });
      // })          


  }

    public initializeNetworkEvents(): void {
        this.network.onDisconnect().subscribe(() => {
            if (this.previousStatus === ConnectionStatusEnum.Online) {
                this.eventCtrl.publish('network:offline');
            }
            this.previousStatus = ConnectionStatusEnum.Offline;
        });
        this.network.onConnect().subscribe(() => {
            if (this.previousStatus === ConnectionStatusEnum.Offline) {
                this.eventCtrl.publish('network:online');
            }
            this.previousStatus = ConnectionStatusEnum.Online;
        });
        window.navigator['connection'].onchange = () => {
          if(window.navigator.onLine) {
            this.eventCtrl.publish('network:online')
            return this.previousStatus = ConnectionStatusEnum.Online
          } 
          this.eventCtrl.publish('network:offline')
          return this.previousStatus = ConnectionStatusEnum.Offline;
        }
       
    }


}