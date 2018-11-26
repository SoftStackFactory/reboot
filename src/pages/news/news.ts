import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RssProvider } from '../../providers/rss/rss';

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  rssArray: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public rss: RssProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
    this.getData();
  }

  getData() {
    this.rss.getRSS().subscribe(
      data => {
        this.rssArray = data;
        console.log(data);
      }
    )
  }

}
