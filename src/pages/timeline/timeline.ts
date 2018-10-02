import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TimelinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
})
export class TimelinePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimelinePage');
  }

  toggleSection(number){
    var x = document.getElementById(number);
    if( x.style.display === "initial" ){
      x.style.display = "none";
    } else if ( x.style.display === "none" ){
      x.style.display = "initial";
    }
  }

}
