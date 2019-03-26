import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProfileModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-modal',
  templateUrl: 'profile-modal.html',
})
export class ProfileModalPage {

  constructor(
    public view: ViewController,
    public navParams: NavParams) {
  }

  closeModal() {
    this.view.dismiss()
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileModalPage');
  }

}
