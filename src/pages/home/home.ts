import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { NetworkProvider } from '../../providers/network/network';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  

  constructor(public navCtrl: NavController, private menu: MenuController, private _network: NetworkProvider) {
    menu.enable(true);
    //console.log( _network.isConnected, "##################")
  }
   
  test(){
    console.log(this._network)
  }
}
