import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RssProvider } from '../../providers/rss/rss';
import { InAppBrowser } from '@ionic-native/in-app-browser';


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

  constructor(public navCtrl: NavController, public navParams: NavParams, public rss: RssProvider, private browser: InAppBrowser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
    this.getData();
  }

  getData() {
    this.rss.getRSS().subscribe(
      data => {
        this.rssArray = data;
        this.rss.array = this.rssArray;
        console.log(data);
      })
  }

  openLink(url) {
    const link = this.browser.create(url);
  }

}
