import { Component } from '@angular/core';
import { NavController, MenuController, ToastController } from 'ionic-angular';
import { NetworkProvider } from '../../providers/network/network';
import { Network } from '@ionic-native/network';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  

  // constructor(public navCtrl: NavController, private menu: MenuController, private _network: NetworkProvider) {
  //   menu.enable(true);
   
  // }


  constructor(public toast: ToastController, private network: Network) {

    this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      this.toast.create({
        message: 'Network connected',
        duration: 2000
      }).present();
    });

    this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
      this.toast.create({
        message: 'Network disconnected',
        duration: 2000
      }).present();
    });
 
}