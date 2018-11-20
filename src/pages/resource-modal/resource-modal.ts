import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ResourceModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resource-modal',
  templateUrl: 'resource-modal.html',
})
export class ResourceModalPage {

  resources : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public viewCtrl: ViewController) {
    this.resources = navParams.get('data')
  
  }

  closeModal () {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResourceModalPage');
    console.log(this.resources)
  }

}
